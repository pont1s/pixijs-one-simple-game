export let WIDTH = window.innerWidth ?? 800;
export let HEIGHT = window.innerHeight ?? 800;

export const changeSize = (width: number, height: number) => {
  WIDTH = width;
  HEIGHT = height;
};
