import { useEffect } from "react";
import { Howl } from "howler";

export default function MusicPlayer() {
  useEffect(() => {
    const sound = new Howl({
      src: ["/music.mp3"],
      loop: true,
      volume: 0.8,
      autoplay: true,
    });

    sound.play();

    return () => sound.unload();
  }, []);

  return null;
}
