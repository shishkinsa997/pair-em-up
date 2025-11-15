import path1 from "../assets/music/cornfield_chase.mp3";
import path2 from "../assets/music/day_one.mp3";
import path3 from "../assets/music/mountains.mp3";
import path4 from "../assets/music/stay.mp3";

const tracks = {
  track1: {
    path: path1,
    name: "Hanz Zimmer - Cornfield Chase",
  },
  track2: {
    path: path2,
    name: "Hanz Zimmer - Day One",
  },
  track3: {
    path: path3,
    name: "Hanz Zimmer - Mountains",
  },
  track4: {
    path: path4,
    name: "Hanz Zimmer - S.T.A.Y.",
  },
};

const values = Object.values(tracks);
const paths = values.map(t => t.path);
const trackNames = values.map(t => t.name);

export { tracks, paths, trackNames };
