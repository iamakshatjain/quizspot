import {User, Err} from '../types';

// Type Check
export const isErr = (obj: Err | User) : obj is Err => {
    return (obj as Err).err !== undefined;
}

// Full Screen
export const goFullScreen = () => {
    const element = document.documentElement;
    element.requestFullscreen()
    .then(() => {})
    .catch(e => console.error(e));
};

export const getOffFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
          .then(() => console.log("Document Exited form Full screen mode"))
          .catch((err) => console.error(err))
      }
}