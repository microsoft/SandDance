declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "url:*.woff" {
  const content: string;
  export default content;
}

declare module "url:*" {
  const content: string;
  export default content;
}