const PRESET_LIST = [
  'ultrafast',
  'superfast',
  'veryfast',
  'faster',
  'fast',
  'medium',
  'slow',
  'slower',
  'veryslow',
  'placebo',
];

const FIELDS = {
  useFilters: {
    type: 'checkbox',
    label: 'Use filters',
  },
  autoWatch: {
    type: 'checkbox',
    label: 'Auto watch',
  },
  ffmpegProcess: {
    type: 'list',
    values: [
      'OSX',
      'LINUX',
      'WINDOWS',
    ],
    label: 'FFMPEG process',
  },
  videoSize: {
    type: 'text',
    label: 'Video size',
  },
  framerate: {
    type: 'number',
    label: 'Framerate',
  },
  imagesFPS: {
    type: 'number',
    label: 'Images FPS',
  },
  imagesPreset: {
    type: 'list',
    values: PRESET_LIST,
    label: 'Images quality',
  },
  videoFPS: {
    type: 'number',
    label: 'Video FPS',
  },
  videoPreset: {
    type: 'list',
    values: PRESET_LIST,
    label: 'Video Quality',
  },
};

export default {
  FIELDS,
};
