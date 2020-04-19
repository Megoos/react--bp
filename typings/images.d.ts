declare module '*.png';
declare module '*.gif';
declare module '*.jpeg';
declare module '*.jpg';

declare module '*.svg' {
  const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
