import process from "process";
import path from "path";
import { mkdir, readFile, writeFile } from "fs/promises";
import consola from "consola";
import * as vueCompiler from "vue/compiler-sfc";
import glob from "fast-glob";
import chalk from "chalk";
import { Project } from "ts-morph";

import {
  buildOutput,
  excludeFiles,
  pkgRoot,
  projRoot,
  syRoot,
} from "@sy-vue-ui/build-utils";
import { pathRewriter } from "../utils";

import type { CompilerOptions, SourceFile } from "ts-morph";

const TSCONFIG_PATH = path.resolve(projRoot, "tsconfig.web.json");
const outDir = path.resolve(buildOutput, "types");

export const generateTypesDefinitions = async () => {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true, // 仅输出声明文件
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true, //保留符号链接(不把符号链接解析为其真实路径;将符号链接文件视为真正的文件)
    skipLibCheck: true, // 忽略lib库类型检查
    noImplicitAny: false, // 不包含隐式any
  };
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true, // 补充tsconfig中解析文件
  });
  const sourceFiles = await addSourceFiles(project);
  consola.success("添加资源文件成功~");
  typeCheck(project);
  consola.success("类型检查通过~");

  await project.emit({
    emitOnlyDtsFiles: true, //  仅输出声明文件
  });
  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(pkgRoot, sourceFile.getFilePath());
    consola.trace(
      chalk.yellow(`正在生产声明文件: ${chalk.bold(relativePath)}`)
    );

    const emitOutput = sourceFile.getEmitOutput();
    const emitFiles = emitOutput.getOutputFiles();
    if (emitFiles.length === 0) {
      throw new Error(`无文件生成: ${chalk.bold(relativePath)}`);
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await mkdir(path.dirname(filepath), {
        recursive: true, // 创建父级目录
      });

      await writeFile(
        filepath,
        pathRewriter("esm")(outputFile.getText()),
        "utf8"
      );

      consola.success(
        chalk.green(`声明文件: ${chalk.bold(relativePath)} 生成成功`)
      );
    });

    await Promise.all(subTasks);
  });
  await Promise.all(tasks);
};

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, "typing/env.d.ts"));
  const globSourceFile = "**/*.{js?(x),ts?(x),vue}";
  const filePaths = excludeFiles(
    await glob([globSourceFile, "!sy-vue-ui/**/*"], {
      cwd: pkgRoot, // 根目录(当前工作目录)
      absolute: true, // 返回条目的绝对路径
      onlyFiles: true, // 仅返回文件
    })
  );
  const syPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: syRoot,
      onlyFiles: true,
    })
  );

  const sourceFiles: SourceFile[] = [];
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith(".vue")) {
        const content = await readFile(file, "utf-8");
        const hasTsNoCheck = content.includes("@ts-nocheck");

        const sfc = vueCompiler.parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let content =
            (hasTsNoCheck ? "// @ts-nocheck\n" : "") + (script?.content ?? "");

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: "xxx",
            });
            content += compiled.content;
          }

          const lang = scriptSetup?.lang || script?.lang || "js";
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          );
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    }),
    ...syPaths.map(async (file) => {
      const content = await readFile(path.resolve(syRoot, file), "utf-8");
      sourceFiles.push(
        project.createSourceFile(path.resolve(pkgRoot, file), content)
      );
    }),
  ]);

  return sourceFiles;
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics();
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics));
    const err = new Error("Failed to generate dts.");
    consola.error(err);
    throw err;
  }
}
