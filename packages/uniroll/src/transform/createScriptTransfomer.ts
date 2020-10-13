import ts from "typescript";
import qs from "querystring";

const defaultCompilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2019,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
  resolveJsonModule: true,
};

export const createTransformScript = ({
  tsconfig,
}: {
  tsconfig?: object | string;
}) => {
  const compilerOptions = tsconfig
    ? { ...defaultCompilerOptions, ...getCompilerOptionsFromConfig(tsconfig) }
    : defaultCompilerOptions;

  return async (code: string, filename: string): Promise<{ code: string }> => {
    if (filename.endsWith(".js")) {
      return { code };
    }
    if (filename.endsWith(".json")) {
      return {
        code: "export default " + JSON.stringify(JSON.parse(code)),
      };
    }
    // for Vue SFC (.vue)
    if (filename.endsWith(".vue")) {
      return { code };
    }
    // for parsed Vue SFC query
    if (isVueSFCParseQuery(filename) && !filename.endsWith('.ts')) {
      return { code };
    }
    const out = ts.transpileModule(code, {
      fileName: filename,
      compilerOptions,
    });
    return {
      code: out.outputText,
    };
  };
};

function isVueSFCParseQuery(id: string): boolean {
  // e.g. (template block): `/App.vue?vue&type=template&id=472cff63`
  return /\?vue&type/.test(id);
}

function getCompilerOptionsFromConfig(tsconfig: object | string) {
  const rawjson =
    typeof tsconfig === "object" ? JSON.stringify(tsconfig) : tsconfig;
  const config = ts.convertCompilerOptionsFromJson(
    rawjson,
    "/",
    "/tsconfig.json"
  );
  return config.options;
}
