// global flag to be compiled away
declare var __HL__: boolean;

// global object in Hl
declare var HLEnvironment: HLEnvironment;

declare type HL = {
  config: HLConfigAPI;
  document: HLDocument;
  requireModule: (name: string) => Object | void;
  supports: (condition: string) => boolean | void;
  isRegisteredModule: (name: string, method ? : string) => boolean;
  isRegisteredComponent: (name: string) => boolean;
};

declare type HLConfigAPI = {
  bundleUrl: string; // === hl.document.URL
  bundleType: string;
  env: HLEnvironment; // === HLEnvironment
};

declare type HLEnvironment = {
  platform: string; // could be "Web", "iOS", "Android"
  hlVersion: string; // the version of HLSDK

  osName: string; // could be "iOS", "Android" or others
  osVersion: string;
  appName: string; // mobile app name or browser name
  appVersion: string;

  // information about current running device
  deviceModel: string; // phone device model
  deviceWidth: number;
  deviceHeight: number;
  scale: number;

  // only available on the web
  userAgent ? : string;
  dpr ? : number;
  rem ? : number;
};

declare interface HLDocument {
  id: string;
  URL: string;
  taskCenter: HLTaskCenter;

  open: () => void;
  close: () => void;
  createElement: (tagName: string, props ? : Object) => HLElement;
  createComment: (text: string) => Object;
  fireEvent: (type: string) => void;
  destroy: () => void;
};

declare interface HLTaskCenter {
  instanceId: string;
  callbackManager: Object;
  send: (type: string, params: Object, args: Array < any > , options ? : Object) => void;
  registerHook: (componentId: string, type: string, hook: string, fn: Function) => void;
  updateData: (componentId: string, data: Object | void, callback ? : Function) => void;
};

declare interface HLElement {
  nodeType: number;
  nodeId: string;
  type: string;
  ref: string;
  text ? : string;

  parentNode: HLElement | void;
  children: Array < HLElement > ;
  previousSibling: HLElement | void;
  nextSibling: HLElement | void;

  appendChild: (node: HLElement) => void;
  removeChild: (node: HLElement, preserved ? : boolean) => void;
  insertBefore: (node: HLElement, before: HLElement) => void;
  insertAfter: (node: HLElement, after: HLElement) => void;
  setAttr: (key: string, value: any, silent ? : boolean) => void;
  setAttrs: (attrs: Object, silent ? : boolean) => void;
  setStyle: (key: string, value: any, silent ? : boolean) => void;
  setStyles: (attrs: Object, silent ? : boolean) => void;
  addEvent: (type: string, handler: Function, args ? : Array < any > ) => void;
  removeEvent: (type: string) => void;
  fireEvent: (type: string) => void;
  destroy: () => void;
};

declare type HLInstanceOption = {
  instanceId: string;
  config: HLConfigAPI;
  document: HLDocument;
  Vue ? : GlobalAPI;
  app ? : Component;
  data ? : Object;
};

declare type HLRuntimeContext = {
  hl: HL;
  service: Object;
  BroadcastChannel ? : Function;
};

declare type HLInstanceContext = {
  Vue: GlobalAPI;

  // DEPRECATED
  setTimeout ? : Function;
  clearTimeout ? : Function;
  setInterval ? : Function;
  clearInterval ? : Function;
};

declare type HLCompilerOptions = CompilerOptions & {
  // whether to compile special template for <recycle-list>
  recyclable ? : boolean;
};

declare type HLCompiledResult = CompiledResult & {
  '@render' ? : string;
};
