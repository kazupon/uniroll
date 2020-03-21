import "./__pre";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/editor/browser/controller/coreCommands.js";
import "monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js";
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
import "monaco-editor/esm/vs/editor/contrib/folding/folding.js";

// languages
import "monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js";
import "monaco-editor/esm/vs/basic-languages/css/css.contribution.js";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution.js";

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_moduleId: string, _label: string) {
    return new Worker("monaco-editor/esm/vs/editor/editor.worker.js", {
      type: "module"
    });
  }
};

//-----

import React, { useState, useRef, useLayoutEffect } from "react";

const initialValue = `import {h, render} from "preact";
console.log(<div>hello</div>);
`;

export default (props: {
  value: string;
  onChangeValue: (value: string) => void;
}) => {
  // const [
  //   editor,
  //   setEditor
  // ] = useState<null | monaco.editor.IStandaloneCodeEditor>(null);

  // react to outer change by prettier
  // const [initialValue, setInitialValue] = useState(props.value);

  // useLayoutEffect(() => {
  //   if (initialValue !== props.value) {
  //     setInitialValue(props.value);

  //     if (editor && editor.getValue() !== props.value) {
  //       editor.setValue(props.value);
  //     }
  //   }
  // }, [props.value]);

  const editorRef = useRef(null as any);

  useLayoutEffect(() => {
    if (editorRef.current) {
      // monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      //   noSemanticValidation: false,
      //   noSyntaxValidation: false
      // });
      // monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      //   // jsx: 'react',
      //   jsx: monaco.languages.typescript.JsxEmit.React,
      //   jsxFactory: "React.createElement",
      //   reactNamespace: "React",
      //   allowNonTsExtensions: true,
      //   allowJs: true,
      //   target: monaco.languages.typescript.ScriptTarget.Latest
      // });

      const newEditor = monaco.editor.create(editorRef.current, {
        // value: props.value,
        value: initialValue,
        language: "typescript",
        theme: "monokai",
        scrollbar: {
          arrowSize: 11
        },
        fontSize: 16,
        wordWrap: "on",
        wordWrapMinified: true,
        // wrappingIndent: "indent",
        minimap: {
          enabled: false
        },
        lineNumbers: "on"
      });

      newEditor.onDidChangeModelContent(event => {
        const value = newEditor.getValue();
        props.onChangeValue(value);
      });
      const rect = editorRef.current.getBoundingClientRect();
      newEditor.layout({ width: rect.width, height: rect.height });
      newEditor.focus();
      // setEditor(newEditor);

      return () => {
        const p = newEditor.getPosition() as monaco.Position;
        // const offset = newEditor.getOffsetForColumn(p.lineNumber, p.column);
        newEditor.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={editorRef}
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%"
      }}
    />
  );
};

// based on monokai pro
const theme = {
  colors: {
    focusBorder: "#727072",
    foreground: "#fcfcfa",
    "widget.shadow": "#19181a",
    "selection.background": "#c1c0c026",
    descriptionForeground: "#939293",
    errorForeground: "#ff6188",
    "textBlockQuote.background": "#403e41",
    "textBlockQuote.border": "#403e41",
    "textCodeBlock.background": "#403e41",
    "textLink.activeForeground": "#fcfcfa",
    "textLink.foreground": "#ffd866",
    "textPreformat.foreground": "#fcfcfa",
    "textSeparator.foreground": "#727072",
    "button.background": "#403e41",
    "button.foreground": "#939293",
    "button.hoverBackground": "#2d2a2e",
    "dropdown.background": "#2d2a2e",
    "dropdown.listBackground": "#403e41",
    "dropdown.border": "#2d2a2e",
    "dropdown.foreground": "#939293",
    "input.background": "#403e41",
    "input.border": "#403e41",
    "input.foreground": "#fcfcfa",
    "input.placeholderForeground": "#727072",
    "inputOption.activeBackground": "#5b595c",
    "inputOption.activeBorder": "#5b595c",
    "inputValidation.errorBackground": "#403e41",
    "inputValidation.errorForeground": "#ff6188",
    "inputValidation.errorBorder": "#ff6188",
    "inputValidation.infoBackground": "#403e41",
    "inputValidation.infoForeground": "#78dce8",
    "inputValidation.infoBorder": "#78dce8",
    "inputValidation.warningBackground": "#403e41",
    "inputValidation.warningForeground": "#fc9867",
    "inputValidation.warningBorder": "#fc9867",
    "scrollbar.shadow": "#2d2a2e",
    "scrollbarSlider.activeBackground": "#fcfcfa12",
    "scrollbarSlider.background": "#fcfcfa12",
    "scrollbarSlider.hoverBackground": "#fcfcfa12",
    "badge.foreground": "#2d2a2e",
    "badge.background": "#ffd866",
    "progressBar.background": "#403e41",
    "list.activeSelectionBackground": "#2d2a2e",
    "list.activeSelectionForeground": "#ffd866",
    "list.errorForeground": "#ff6188",
    "list.warningForeground": "#fc9867",
    "list.dropBackground": "#221f22bf",
    "list.focusBackground": "#2d2a2e",
    "list.focusForeground": "#fcfcfa",
    "list.highlightForeground": "#fcfcfa",
    "list.hoverBackground": "#221f22",
    "list.hoverForeground": "#fcfcfa",
    "list.inactiveSelectionBackground": "#2d2a2e",
    "list.inactiveSelectionForeground": "#ffd866",
    "list.inactiveFocusBackground": "#2d2a2e",
    "list.invalidItemForeground": "#ff6188",
    "listFilterWidget.background": "#2d2a2e",
    "listFilterWidget.outline": "#2d2a2e",
    "listFilterWidget.noMatchesOutline": "#ff6188",
    "activityBar.background": "#19181a",
    "activityBar.dropBackground": "#221f22bf",
    "activityBar.foreground": "#c1c0c0",
    "activityBar.inactiveForeground": "#5b595c",
    "activityBar.border": "#19181a",
    "activityBarBadge.background": "#ffd866",
    "activityBarBadge.foreground": "#2d2a2e",
    "breadcrumb.foreground": "#939293",
    "breadcrumb.focusForeground": "#c1c0c0",
    "breadcrumb.activeSelectionForeground": "#fcfcfa",
    "settings.headerForeground": "#ffd866",
    "settings.modifiedItemForeground": "#ffd866",
    "settings.dropdownBackground": "#403e41",
    "settings.dropdownForeground": "#fcfcfa",
    "settings.dropdownBorder": "#403e41",
    "settings.dropdownListBorder": "#939293",
    "settings.modifiedItemIndicator": "#ffd866",
    "settings.checkboxBackground": "#403e41",
    "settings.checkboxForeground": "#fcfcfa",
    "settings.checkboxBorder": "#403e41",
    "settings.textInputBackground": "#403e41",
    "settings.textInputForeground": "#fcfcfa",
    "settings.textInputBorder": "#403e41",
    "settings.numberInputBackground": "#403e41",
    "settings.numberInputForeground": "#fcfcfa",
    "settings.numberInputBorder": "#403e41",
    "sideBar.background": "#221f22",
    "sideBar.foreground": "#939293",
    "sideBar.border": "#19181a",
    "sideBar.dropBackground": "#221f22bf",
    "sideBarTitle.foreground": "#5b595c",
    "sideBarSectionHeader.background": "#221f22",
    "sideBarSectionHeader.foreground": "#727072",
    "editorGroup.emptyBackground": "#19181a",
    "editorGroup.focusedEmptyBorder": "#221f22",
    "editorGroup.border": "#221f22",
    "editorGroup.dropBackground": "#221f22bf",
    "editorGroupHeader.noTabsBackground": "#2d2a2e",
    "editorGroupHeader.tabsBackground": "#2d2a2e",
    "editorGroupHeader.tabsBorder": "#2d2a2e",
    "editorPane.background": "#2d2a2e",
    "tab.activeBackground": "#2d2a2e",
    "tab.activeForeground": "#ffd866",
    "tab.border": "#2d2a2e",
    "tab.activeBorder": "#ffd866",
    "tab.unfocusedActiveBorder": "#939293",
    "tab.inactiveBackground": "#2d2a2e",
    "tab.inactiveForeground": "#939293",
    "tab.unfocusedActiveForeground": "#c1c0c0",
    "tab.unfocusedInactiveForeground": "#939293",
    "tab.hoverBackground": "#2d2a2e",
    "tab.unfocusedHoverBackground": "#2d2a2e",
    "tab.hoverBorder": "#5b595c",
    "tab.unfocusedHoverBorder": "#2d2a2e",
    "tab.activeModifiedBorder": "#5b595c",
    "tab.inactiveModifiedBorder": "#5b595c",
    "tab.unfocusedActiveModifiedBorder": "#403e41",
    "tab.unfocusedInactiveModifiedBorder": "#403e41",
    "editor.background": "#2d2a2e",
    "editor.foreground": "#fcfcfa",
    "editorLineNumber.foreground": "#5b595c",
    "editorLineNumber.activeForeground": "#c1c0c0",
    "editorCursor.background": "#2d2a2e",
    "editorCursor.foreground": "#fcfcfa",
    "editor.selectionBackground": "#c1c0c026",
    "editor.inactiveSelectionBackground": "#fcfcfa0c",
    "editor.selectionHighlightBackground": "#fcfcfa26",
    "editor.selectionHighlightBorder": "#00000000",
    "editor.wordHighlightBackground": "#fcfcfa26",
    "editor.wordHighlightBorder": "#00000000",
    "editor.wordHighlightStrongBackground": "#fcfcfa26",
    "editor.wordHighlightStrongBorder": "#00000000",
    "editor.findMatchBackground": "#fcfcfa26",
    "editor.findMatchBorder": "#ffd866",
    "editor.findMatchHighlightBackground": "#fcfcfa26",
    "editor.findMatchHighlightBorder": "#00000000",
    "editor.findRangeHighlightBackground": "#fcfcfa0c",
    "editor.findRangeHighlightBorder": "#00000000",
    "editor.hoverHighlightBackground": "#fcfcfa0c",
    "editor.lineHighlightBackground": "#fcfcfa0c",
    "editor.lineHighlightBorder": "#00000000",
    "editorLink.activeForeground": "#78dce8",
    "editor.rangeHighlightBackground": "#403e41",
    "editor.rangeHighlightBorder": "#403e41",
    "editorWhitespace.foreground": "#5b595c",
    "editorIndentGuide.background": "#403e41",
    "editorRuler.foreground": "#5b595c",
    "editorCodeLens.foreground": "#727072",
    "editorBracketMatch.background": "#2d2a2e",
    "editorBracketMatch.border": "#727072",
    "editorError.foreground": "#ff6188",
    "editorError.border": "#00000000",
    "editorWarning.foreground": "#fc9867",
    "editorWarning.border": "#00000000",
    "editorInfo.foreground": "#78dce8",
    "editorInfo.border": "#2d2a2e",
    "editorHint.foreground": "#ab9df2",
    "editorHint.border": "#2d2a2e",
    "editorGutter.background": "#2d2a2e",
    "editorGutter.modifiedBackground": "#fc9867",
    "editorGutter.addedBackground": "#a9dc76",
    "editorGutter.deletedBackground": "#ff6188",
    "diffEditor.insertedTextBackground": "#a9dc7619",
    "diffEditor.insertedTextBorder": "#00000000",
    "diffEditor.removedTextBackground": "#ff618819",
    "diffEditor.removedTextBorder": "#00000000",
    "editorWidget.background": "#403e41",
    "editorWidget.border": "#403e41",
    "editorSuggestWidget.background": "#403e41",
    "editorSuggestWidget.border": "#403e41",
    "editorSuggestWidget.foreground": "#c1c0c0",
    "editorSuggestWidget.highlightForeground": "#fcfcfa",
    "editorSuggestWidget.selectedBackground": "#727072",
    "editorHoverWidget.background": "#403e41",
    "editorHoverWidget.border": "#2d2a2e",
    "debugExceptionWidget.background": "#403e41",
    "debugExceptionWidget.border": "#2d2a2e",
    "editorMarkerNavigation.background": "#403e41",
    "editorMarkerNavigationError.background": "#ff6188",
    "editorMarkerNavigationWarning.background": "#fc9867",
    "editorMarkerNavigationInfo.background": "#78dce8",
    "peekView.border": "#2d2a2e",
    "peekViewEditor.background": "#403e41",
    "peekViewEditorGutter.background": "#403e41",
    "peekViewEditor.matchHighlightBackground": "#5b595c",
    "peekViewResult.background": "#403e41",
    "peekViewResult.fileForeground": "#939293",
    "peekViewResult.lineForeground": "#939293",
    "peekViewResult.matchHighlightBackground": "#5b595c",
    "peekViewResult.selectionBackground": "#403e41",
    "peekViewResult.selectionForeground": "#fcfcfa",
    "peekViewTitle.background": "#403e41",
    "peekViewTitleDescription.foreground": "#939293",
    "peekViewTitleLabel.foreground": "#fcfcfa",
    "merge.currentHeaderBackground": "#ff618826",
    "merge.currentContentBackground": "#ff618819",
    "merge.incomingHeaderBackground": "#a9dc7626",
    "merge.incomingContentBackground": "#a9dc7619",
    "merge.border": "#2d2a2e",
    "merge.commonHeaderBackground": "#fcfcfa26",
    "merge.commonContentBackground": "#fcfcfa19",
    "editorOverviewRuler.border": "#2d2a2e",
    "editorOverviewRuler.currentContentForeground": "#403e41",
    "editorOverviewRuler.incomingContentForeground": "#403e41",
    "editorOverviewRuler.findMatchForeground": "#fcfcfa26",
    "editorOverviewRuler.rangeHighlightForeground": "#fcfcfa26",
    "editorOverviewRuler.selectionHighlightForeground": "#fcfcfa26",
    "editorOverviewRuler.wordHighlightForeground": "#fcfcfa26",
    "editorOverviewRuler.wordHighlightStrongForeground": "#fcfcfa26",
    "editorOverviewRuler.modifiedForeground": "#fc9867",
    "editorOverviewRuler.addedForeground": "#a9dc76",
    "editorOverviewRuler.deletedForeground": "#ff6188",
    "editorOverviewRuler.errorForeground": "#ff6188",
    "editorOverviewRuler.warningForeground": "#fc9867",
    "editorOverviewRuler.infoForeground": "#78dce8",
    "panel.background": "#403e41",
    "panel.border": "#2d2a2e",
    "panel.dropBackground": "#221f22bf",
    "panelTitle.activeBorder": "#ffd866",
    "panelTitle.activeForeground": "#ffd866",
    "panelTitle.inactiveForeground": "#939293",
    "statusBar.background": "#221f22",
    "statusBar.foreground": "#727072",
    "statusBar.border": "#19181a",
    "statusBar.debuggingBackground": "#727072",
    "statusBar.debuggingForeground": "#fcfcfa",
    "statusBar.debuggingBorder": "#221f22",
    "statusBar.noFolderBackground": "#221f22",
    "statusBar.noFolderForeground": "#727072",
    "statusBar.noFolderBorder": "#19181a",
    "statusBarItem.activeBackground": "#2d2a2e",
    "statusBarItem.hoverBackground": "#2d2a2e",
    "statusBarItem.prominentBackground": "#403e41",
    "statusBarItem.prominentHoverBackground": "#403e41",
    "titleBar.activeBackground": "#221f22",
    "titleBar.activeForeground": "#939293",
    "titleBar.inactiveBackground": "#221f22",
    "titleBar.inactiveForeground": "#5b595c",
    "titleBar.border": "#19181a",
    "notificationCenter.border": "#403e41",
    "notificationCenterHeader.foreground": "#939293",
    "notificationCenterHeader.background": "#403e41",
    "notificationToast.border": "#403e41",
    "notifications.foreground": "#c1c0c0",
    "notifications.background": "#403e41",
    "notifications.border": "#403e41",
    "notificationLink.foreground": "#ffd866",
    "extensionButton.prominentForeground": "#fcfcfa",
    "extensionButton.prominentBackground": "#403e41",
    "extensionButton.prominentHoverBackground": "#5b595c",
    "pickerGroup.border": "#2d2a2e",
    "pickerGroup.foreground": "#5b595c",
    "terminal.background": "#403e41",
    "terminal.foreground": "#fcfcfa",
    "terminal.ansiBlack": "#403e41",
    "terminal.ansiBlue": "#fc9867",
    "terminal.ansiBrightBlack": "#727072",
    "terminal.ansiBrightBlue": "#fc9867",
    "terminal.ansiBrightCyan": "#78dce8",
    "terminal.ansiBrightGreen": "#a9dc76",
    "terminal.ansiBrightMagenta": "#ab9df2",
    "terminal.ansiBrightRed": "#ff6188",
    "terminal.ansiBrightWhite": "#fcfcfa",
    "terminal.ansiBrightYellow": "#ffd866",
    "terminal.ansiCyan": "#78dce8",
    "terminal.ansiGreen": "#a9dc76",
    "terminal.ansiMagenta": "#ab9df2",
    "terminal.ansiRed": "#ff6188",
    "terminal.ansiWhite": "#fcfcfa",
    "terminal.ansiYellow": "#ffd866",
    "terminal.selectionBackground": "#fcfcfa26",
    "terminalCursor.background": "#00000000",
    "terminalCursor.foreground": "#fcfcfa",
    "debugToolBar.background": "#403e41",
    "welcomePage.buttonBackground": "#403e41",
    "welcomePage.buttonHoverBackground": "#5b595c",
    "walkThrough.embeddedEditorBackground": "#221f22",
    "gitDecoration.modifiedResourceForeground": "#a9dc76",
    "gitDecoration.deletedResourceForeground": "#ff6188",
    "gitDecoration.untrackedResourceForeground": "#fc9867",
    "gitDecoration.ignoredResourceForeground": "#5b595c",
    "gitDecoration.conflictingResourceForeground": "#fc9867"
  },
  tokenColors: [
    {
      scope: [
        "comment",
        "comment keyword",
        "comment markup.underline.link",
        "comment string",
        "comment punctuation.definition",
        "comment punctuation",
        "comment text"
      ],
      settings: {
        name: "Comments and overrides inside comments",
        fontStyle: "italic",
        foreground: "#727072"
      }
    },
    {
      scope: "comment storage.type",
      settings: { name: "JSDoc storage type", foreground: "#727072" }
    },
    {
      scope: "comment entity.name.type",
      settings: { name: "JSDoc entity name", foreground: "#c1c0c0" }
    },
    {
      scope: ["comment variable", "comment variable.other"],
      settings: { name: "JSDoc variable", foreground: "#c1c0c0" }
    },
    {
      scope: "comment keyword.codetag.notation",
      settings: {
        name: "Comment TODO / FIXME (at least in VSCode Python)",
        foreground: "#ab9df2"
      }
    },
    {
      scope: "comment.git-status.header.remote",
      settings: { name: "git status remote", foreground: "#ff6188" }
    },
    {
      scope: "comment.git-status.header.local",
      settings: { name: "git status local", foreground: "#78dce8" }
    },
    {
      scope: "comment.other.git-status.head",
      settings: { name: "git status remote", foreground: "#fcfcfa" }
    },
    {
      scope: "constant",
      settings: { name: "Constant", foreground: "#ab9df2" }
    },
    {
      scope: "constant.other",
      settings: { name: "Constant", foreground: "#fcfcfa" }
    },
    {
      scope: "constant.other.php",
      settings: { name: "Constant", foreground: "#ab9df2" }
    },
    {
      scope: "constant.other.property",
      settings: { name: "Constant as property", foreground: "#ab9df2" }
    },
    {
      scope: "constant.other.citation.latex",
      settings: { name: "Constant in latex", foreground: "#ab9df2" }
    },
    {
      scope: "constant.other.color",
      settings: {
        name: "Constant as color (in css / sass)",
        foreground: "#ab9df2"
      }
    },
    {
      scope: "constant.other.character-class.escape",
      settings: {
        name: "Constant as character class escape (e.g. in regex)",
        foreground: "#ab9df2"
      }
    },
    {
      scope: "constant.other.key",
      settings: {
        name: "Constant as key (e.g. in puppet manifests)",
        foreground: "#ab9df2"
      }
    },
    {
      scope: "constant.other.symbol",
      settings: {
        name: "Constant as symbol (e.g. in ruby)",
        foreground: "#fc9867"
      }
    },
    {
      scope: "constant.numeric",
      settings: { name: "Number", foreground: "#ab9df2" }
    },
    {
      scope: "constant.language",
      settings: { name: "Constant", foreground: "#ab9df2" }
    },
    {
      scope: "constant.character.escape",
      settings: { name: "Character escape", foreground: "#ab9df2" }
    },
    {
      scope: "constant.numeric.line-number.find-in-files",
      settings: { name: "Search result line numbers", foreground: "#5b595c" }
    },
    {
      scope: "constant.numeric.line-number.match.find-in-files",
      settings: {
        name: "Search result matched line numbes",
        foreground: "#ffd866"
      }
    },
    {
      scope: "entity.name.section",
      settings: { name: "Sections", foreground: "#ffd866" }
    },
    {
      scope: ["entity.name.function", "entity.name.function.templated"],
      settings: { name: "Functions", foreground: "#a9dc76" }
    },
    {
      scope: "entity.name.function.member.static",
      settings: { name: "Functions", foreground: "#fcfcfa" }
    },
    {
      scope: [
        "entity.name.type.class.templated",
        "entity.name.type.class.generic",
        "entity.name.type.namespace"
      ],
      settings: { name: "Class template", foreground: "#78dce8" }
    },
    {
      scope: "entity.name.label",
      settings: { name: "label", foreground: "#ab9df2" }
    },
    {
      scope: "entity.name.function.preprocessor",
      settings: { name: "Macros", foreground: "#78dce8" }
    },
    {
      scope: "entity.name",
      settings: { name: "Entity name", foreground: "#a9dc76" }
    },
    {
      scope: "entity.name.class",
      settings: { name: "Class name", foreground: "#78dce8" }
    },
    {
      scope: "entity.name.constant",
      settings: { name: "Constant name", foreground: "#ab9df2" }
    },
    {
      scope: "entity.name.namespace",
      settings: { name: "Namespace", foreground: "#fcfcfa" }
    },
    {
      scope: "entity.other.inherited-class",
      settings: {
        name: "Inherited class",
        fontStyle: "italic",
        foreground: "#78dce8"
      }
    },
    {
      scope: "entity.name.function",
      settings: { name: "Function name", foreground: "#a9dc76" }
    },
    {
      scope: [
        "entity.name.tag",
        "entity.name.tag.js.jsx support.class.component.js.jsx",
        "entity.name.tag support.class.component"
      ],
      settings: { name: "Tag name", foreground: "#ff6188" }
    },
    {
      scope: "entity.name.function.operator",
      settings: { name: "Operator", foreground: "#ff6188" }
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.type.class.reference",
        "entity.name.type.class.value"
      ],
      settings: { name: "Entity name type", foreground: "#78dce8" }
    },
    {
      scope: "entity.other.attribute-name",
      settings: {
        name: "Tag attribute",
        fontStyle: "italic",
        foreground: "#78dce8"
      }
    },
    {
      scope: [
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.parent-selector-suffix.css",
        "entity.other.attribute-name.parent-selector-suffix.css punctuation.definition.entity.css",
        "entity.other.attribute-name.css"
      ],
      settings: { name: "CSS class", foreground: "#a9dc76" }
    },
    {
      scope: "entity.other.attribute-name.id.css",
      settings: { name: "CSS id", foreground: "#fc9867" }
    },
    {
      scope: [
        "entity.other.attribute-name.pseudo-class.css",
        "entity.other.pseudo-class.css",
        "entity.other.pseudo-element.css"
      ],
      settings: {
        name: "CSS pseudo class",
        fontStyle: "italic",
        foreground: "#78dce8"
      }
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { name: "Function names / calls", foreground: "#a9dc76" }
    },
    {
      scope: "entity.other.git-status.hex",
      settings: { name: "git status commit hex", foreground: "#ab9df2" }
    },
    {
      scope: "entity.other.jinja2.delimiter",
      settings: { name: "jinja delimiters", foreground: "#939293" }
    },
    {
      scope: "entity.name.operator.custom-literal",
      settings: { name: "custom literal", foreground: "#fcfcfa" }
    },
    {
      scope: "entity.name.operator.custom-literal.string",
      settings: { name: "custom literal string", foreground: "#ffd866" }
    },
    {
      scope: "entity.name.operator.custom-literal.number",
      settings: { name: "custom literal number", foreground: "#ab9df2" }
    },
    { scope: "invalid", settings: { name: "Invalid", fontStyle: "italic" } },
    { scope: "keyword", settings: { name: "Keyword", foreground: "#ff6188" } },
    {
      scope: "keyword.control",
      settings: {
        name:
          "Control keywords examples include if, try, end and while. Some syntaxes prefer to mark if and else with the conditional variant. The import variant is often used in appropriate situations.",
        foreground: "#ff6188"
      }
    },
    {
      scope: "keyword.control.directive",
      settings: { name: "keyword control directive", foreground: "#ff6188" }
    },
    {
      scope: [
        "keyword.operator",
        "keyword.operator.member",
        "keyword.operator.new"
      ],
      settings: { name: "Operator", foreground: "#ff6188" }
    },
    {
      scope: "keyword.other.substitution",
      settings: { name: "Substitution string", foreground: "#939293" }
    },
    {
      scope: ["keyword.other.template.begin", "keyword.other.template.end"],
      settings: { name: "Template literal begin / end", foreground: "#ff6188" }
    },
    {
      scope: [
        "keyword.operator.heading.restructuredtext",
        "keyword.operator.table.row.restructuredtext keyword.operator.table.data.restructuredtext"
      ],
      settings: {
        name: "RestructuredText heading, table markup",
        foreground: "#939293"
      }
    },
    {
      scope: "markup.italic",
      settings: { name: "Italic", fontStyle: "italic" }
    },
    { scope: "markup.bold", settings: { name: "Bold", fontStyle: "bold" } },
    {
      scope: "markup.heading",
      settings: { name: "Heading", foreground: "#ffd866" }
    },
    { scope: "markup.raw", settings: { name: "Raw", foreground: "#fc9867" } },
    {
      scope: "markup.underline",
      settings: { name: "Underline", fontStyle: "underline" }
    },
    {
      scope: "markup.underline.link",
      settings: { name: "Link", foreground: "#a9dc76" }
    },
    {
      scope: [
        "markup.inserted",
        "markup.inserted punctuation.definition.inserted"
      ],
      settings: { name: "Diff inserted", foreground: "#a9dc76" }
    },
    {
      scope: [
        "markup.deleted",
        "markup.deleted punctuation.definition.deleted"
      ],
      settings: { name: "Diff deleted", foreground: "#ff6188" }
    },
    {
      scope: [
        "markup.changed",
        "markup.changed punctuation.definition.changed"
      ],
      settings: { name: "Diff changed", foreground: "#ffd866" }
    },
    {
      scope: [
        "markup.ignored",
        "markup.ignored punctuation.definition.ignored"
      ],
      settings: { name: "Diff ignored", foreground: "#939293" }
    },
    {
      scope: "markup.untracked",
      settings: { name: "Diff untracked", foreground: "#939293" }
    },
    {
      scope: "markup.quote",
      settings: { name: "Markup quote", fontStyle: "italic" }
    },
    {
      scope: [
        "meta.brace.round",
        "meta.brace.square",
        "meta.brace.curly",
        "meta.delimiter.comma.js",
        "meta.function-call.without-arguments.js",
        "meta.function-call.method.without-arguments.js"
      ],
      settings: { name: "Braces, delimiters", foreground: "#939293" }
    },
    {
      scope: [
        "meta.function-call.python",
        "meta.function-call.arguments.python meta.function-call.python"
      ],
      settings: { name: "Function call", foreground: "#a9dc76" }
    },
    {
      scope: "meta.function-call.python meta.function-call.arguments.python",
      settings: { name: "Function arguments", foreground: "#fcfcfa" }
    },
    {
      scope: "meta.instance.constructor",
      settings: { name: "Constructor (new MyClass())", foreground: "#a9dc76" }
    },
    {
      scope: [
        "meta.attribute-with-value.class string",
        "meta.attribute.class.html string"
      ],
      settings: {
        name: "Class string name (i.e. in html attributes)",
        foreground: "#a9dc76"
      }
    },
    {
      scope: [
        "meta.attribute-with-value.id string",
        "meta.attribute.id.html string"
      ],
      settings: {
        name: "ID string name (i.e. in html attributes)",
        foreground: "#fc9867"
      }
    },
    {
      scope: [
        "source.json meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary",
        "source.json meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string",
        "source.json meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary string"
      ],
      settings: { name: "JSON keys (and invisibles)", foreground: "#fcfcfa" }
    },
    {
      scope: [
        "source.json meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string",
        "source.json meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value meta.structure.dictionary meta.structure.dictionary.value string"
      ],
      settings: { name: "JSON values", foreground: "#ffd866" }
    },
    {
      scope: "meta.object.member",
      settings: { name: "Object members", foreground: "#fcfcfa" }
    },
    {
      scope: "meta.property-list.css variable.other",
      settings: { name: "SCSS Variable", foreground: "#fc9867" }
    },
    {
      scope: ["entity.name.constant.preprocessor", "meta.preprocessor"],
      settings: { name: "Preprocessor", foreground: "#ab9df2" }
    },
    {
      scope: "meta.diff.git-diff.header",
      settings: { name: "git diff header", foreground: "#ffd866" }
    },
    {
      scope: "punctuation",
      settings: { name: "Punctuation", foreground: "#939293" }
    },
    {
      scope: [
        "punctuation.definition.tag",
        "punctuation.definition.tag source",
        "punctuation.definition.group.begin.ruby",
        "punctuation.definition.group.end.ruby",
        "punctuation.definition.group.begin.css",
        "punctuation.definition.group.end.css",
        "punctuation.definition.string.end.html source.css"
      ],
      settings: { name: "Punctuation tags", foreground: "#939293" }
    },
    {
      scope: "punctuation.definition.group",
      settings: { name: "Group (i.e. in regex)", foreground: "#fcfcfa" }
    },
    {
      scope: "punctuation.definition.comment",
      settings: { name: "Comment start / end", foreground: "#727072" }
    },
    {
      scope: [
        "punctuation.definition.variable",
        "punctuation.definition.keyword.scss",
        "punctuation.definition.entity.css"
      ],
      settings: {
        name:
          "Variable indicator (i.e. in php or in include directives in sass)",
        foreground: "#c1c0c0"
      }
    },
    {
      scope: [
        "punctuation.section.embedded",
        "punctuation.section.embedded entity.name.tag",
        "punctuation.section.embedded constant.other",
        "punctuation.section.embedded source"
      ],
      settings: {
        name: "Punctuation section embedded (i.e. ?php blocks in html)",
        foreground: "#fc9867"
      }
    },
    {
      scope: [
        "punctuation.template-string.element.begin",
        "punctuation.template-string.element.end",
        "punctuation.definition.string.template.begin",
        "punctuation.definition.string.template.end",
        "string.quoted.template punctuation.definition.string.begin",
        "string.quoted.template punctuation.definition.string.end"
      ],
      settings: {
        name: "Punctuation template string (`example`)",
        foreground: "#ff6188"
      }
    },
    {
      scope: [
        "meta.paragraph.markdown meta.dummy.line-break",
        "meta.paragraph.markdown meta.hard-line-break.markdown"
      ],
      settings: {
        Name: "Punctuation hard line break in Markdown",
        background: "#ab9df2"
      }
    },
    {
      scope: "region.redish",
      settings: {
        name: "region red color",
        foreground: "#ff6188",
        background: "#ff618859"
      }
    },
    {
      scope: "region.orangish",
      settings: {
        name: "region orange color",
        foreground: "#fc9867",
        background: "#fc986759"
      }
    },
    {
      scope: "region.yellowish",
      settings: {
        name: "region yellow color",
        foreground: "#ffd866",
        background: "#ffd86659"
      }
    },
    {
      scope: "region.greenish",
      settings: {
        name: "region green color",
        foreground: "#a9dc76",
        background: "#a9dc7659"
      }
    },
    {
      scope: "region.bluish",
      settings: {
        name: "region blue color",
        foreground: "#78dce8",
        background: "#78dce859"
      }
    },
    {
      scope: "region.purplish",
      settings: {
        name: "region purple color",
        foreground: "#ab9df2",
        background: "#ab9df259"
      }
    },
    {
      scope: "region.pinkish",
      settings: {
        name: "region pink color",
        foreground: "#ff6188",
        background: "#ff618859"
      }
    },
    {
      scope: "region.whitish",
      settings: {
        name: "White for ST3 for non-colorized scheme",
        foreground: "#FFFFFF"
      }
    },
    { scope: "source", settings: { name: "source", foreground: "#fcfcfa" } },
    {
      scope: ["source.scss", "source.sass"],
      settings: { name: "SASS, SCSS default", foreground: "#939293" }
    },
    {
      scope: [
        "source.sass variable.other",
        "source.sass variable.sass",
        "source.scss variable.other",
        "source.scss variable.scss",
        "source.scss variable.sass",
        "source.css variable.other",
        "source.css variable.scss",
        "source.less variable.other",
        "source.less variable.other.less",
        "source.less variable.declaration.less"
      ],
      settings: {
        name: "SASS, SCSS and LESS variables",
        fontStyle: "italic",
        foreground: "#fc9867"
      }
    },
    {
      scope: "source.git-show.commit.sha",
      settings: { name: "git", foreground: "#ab9df2" }
    },
    {
      scope: [
        "source.git-show.author",
        "source.git-show.date",
        "source.git-diff.command",
        "source.git-diff.command meta.diff.git-diff.header.from-file",
        "source.git-diff.command meta.diff.git-diff.header.to-file"
      ],
      settings: { name: "git", foreground: "#939293" }
    },
    {
      scope: [
        "source.git-show meta.diff.git-diff.header.extended.index.from-sha",
        "source.git-show meta.diff.git-diff.header.extended.index.to-sha"
      ],
      settings: { name: "git diff header hash", foreground: "#ab9df2" }
    },
    {
      scope: "source.git-show meta.diff.range.unified",
      settings: { name: "git diff header range", foreground: "#fc9867" }
    },
    {
      scope: [
        "source.git-show meta.diff.header.from-file",
        "source.git-show meta.diff.header.to-file"
      ],
      settings: { name: "git diff header files", foreground: "#939293" }
    },
    { scope: "storage", settings: { name: "Storage", foreground: "#ff6188" } },
    {
      scope: "storage.type",
      settings: {
        name:
          "Types and definition/declaration keywords should use the following scope. Examples include int, bool, char, func, function, class and def. Depending on the language and semantics, const may be this or storage.modifier.",
        fontStyle: "italic",
        foreground: "#78dce8"
      }
    },
    {
      scope: "storage.type.extends",
      settings: { name: "Extends", fontStyle: "normal", foreground: "#ff6188" }
    },
    {
      scope: "storage.type.function.arrow",
      settings: {
        name: "Fat arrow function",
        fontStyle: "normal",
        foreground: "#ff6188"
      }
    },
    {
      scope: ["storage.modifier", "storage.type.modifier"],
      settings: {
        name:
          "Keywords that affect the storage of a variable, function or data structure should use the following scope. Examples include static, inline, const, public and private.",
        fontStyle: "italic",
        foreground: "#ff6188"
      }
    },
    {
      scope: "storage.class.restructuredtext.ref",
      settings: { name: "refs (Restructured text)", foreground: "#ab9df2" }
    },
    { scope: "string", settings: { name: "String", foreground: "#ffd866" } },
    {
      scope: "string.unquoted.label",
      settings: { name: "String label", foreground: "#fcfcfa" }
    },
    {
      scope: "string source",
      settings: { name: "Source in template string", foreground: "#fcfcfa" }
    },
    {
      scope: "string source punctuation.section.embedded",
      settings: {
        name: "Embedded punctuation begin / end in template string",
        foreground: "#939293"
      }
    },
    {
      scope: ["string.other.link.title", "string.other.link.description"],
      settings: { name: "link title", foreground: "#ff6188" }
    },
    {
      scope: "string.other.link.description.title",
      settings: { name: "link description", foreground: "#78dce8" }
    },
    {
      scope: [
        "string.regexp punctuation.definition.string.begin",
        "string.regexp punctuation.definition.string.end"
      ],
      settings: { name: "String regexp begin / end", foreground: "#ff6188" }
    },
    {
      scope: ["string.other.ref", "string.other.restructuredtext.ref"],
      settings: { name: "refs (Restructured text)", foreground: "#a9dc76" }
    },
    {
      scope: "string.other.git-status.help.key",
      settings: {
        name: "git key in git status help text",
        foreground: "#c1c0c0"
      }
    },
    {
      scope: "string.other.git-status.remote",
      settings: { name: "git status remote", foreground: "#ff6188" }
    },
    {
      scope: "support.constant",
      settings: { name: "Library constant", foreground: "#78dce8" }
    },
    {
      scope: "support.constant.handlebars",
      settings: { name: "Handlebars start / end", foreground: "#939293" }
    },
    {
      scope: "support.type.vendor-prefix.css",
      settings: { name: "vendor prefix", foreground: "#c1c0c0" }
    },
    {
      scope: "support.function",
      settings: { name: "Function name", foreground: "#a9dc76" }
    },
    {
      scope: ["support.type", "entity.name.type.object.console"],
      settings: {
        name: "Library type",
        fontStyle: "italic",
        foreground: "#78dce8"
      }
    },
    {
      scope: "support.variable",
      settings: { name: "Support variables", foreground: "#78dce8" }
    },
    {
      scope: "support.type.property-name",
      settings: {
        name: "Library type property",
        fontStyle: "normal",
        foreground: "#fcfcfa"
      }
    },
    {
      scope: "support.class",
      settings: { name: "Library class", foreground: "#78dce8" }
    },
    { scope: "text", settings: { name: "text", foreground: "#fcfcfa" } },
    {
      scope: "text.find-in-files",
      settings: { name: "Search result", foreground: "#fcfcfa" }
    },
    {
      scope: ["variable", "variable.other"],
      settings: { name: "Variable", foreground: "#fcfcfa" }
    },
    {
      scope: ["variable.parameter", "parameters variable.function"],
      settings: {
        name: "Function arguments",
        fontStyle: "italic",
        foreground: "#fc9867"
      }
    },
    {
      scope: [
        "variable.language",
        "variable.parameter.function.language.special.self.python",
        "variable.parameter.function.language.special.cls.python"
      ],
      settings: {
        name:
          "Reserved variable names that are specified by the language, such as this, self, super, arguments. Also in function arguments (e.g. like in Python)",
        fontStyle: "italic",
        foreground: "#c1c0c0"
      }
    },
    {
      scope: "variable.language.arguments",
      settings: {
        name: "Reserved variable names: 'arguments'",
        foreground: "#ab9df2"
      }
    },
    {
      scope: "variable.other.class",
      settings: { name: "Library function", foreground: "#78dce8" }
    },
    {
      scope: "variable.other.constant",
      settings: {
        name:
          "Immutable variables, often via a const modifier, should receive the following scope. Depending on the language and semantics, entity.name.constant may be a better choice.",
        foreground: "#ab9df2"
      }
    },
    {
      scope: "variable.other.member",
      settings: {
        name:
          "Fields, properties, members and attributes of a class or other data structure should use:",
        foreground: "#fcfcfa"
      }
    },
    {
      scope: "variable.other.enummember",
      settings: { name: "Enum member", foreground: "#ab9df2" }
    },
    {
      scope: [
        "variable.other.property",
        "variable.other.property.static",
        "variable.other.event"
      ],
      settings: { name: "Variable property", foreground: "#fcfcfa" }
    },
    {
      scope: "variable.function",
      settings: {
        name:
          "Function and method names should be scoped using the following, but only when they are being invoked. When defined, they should use entity.name.function.",
        foreground: "#a9dc76"
      }
    },
    {
      scope: "variable.other.substitution",
      settings: {
        name: "Substitution (restructured text)",
        foreground: "#fc9867"
      }
    },
    {
      scope: [
        "source.ruby variable.other.readwrite.instance.ruby",
        "source.ruby variable.other.readwrite.class.ruby"
      ],
      settings: { name: "Ruby instance variables", foreground: "#ab9df2" }
    },
    {
      scope: "source.jinja2 variable.other.jinja2.block",
      settings: { name: "jinja2 variable block", foreground: "#a9dc76" }
    },
    {
      scope: "source.jinja2 variable.other.jinja2",
      settings: { name: "jinja2 variable", foreground: "#fc9867" }
    }
  ]
};

monaco.editor.defineTheme("monokai", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  // encodedTokensColors?: string[];
  colors: theme.colors
});
