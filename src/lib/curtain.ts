type Controller = { cover: (label?: string) => Promise<void> };

let controller: Controller | null = null;

export const registerCurtain = (c: Controller | null) => {
  controller = c;
};

/** Plays the page-transition curtain over the screen. Resolves once fully covered. */
export const coverScreen = (label?: string) => (controller ? controller.cover(label) : Promise.resolve());
