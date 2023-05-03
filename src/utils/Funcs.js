// eslint-disable-next-line import/prefer-default-export
export const timeConvertor = (timecode, multiply = 1) =>
  `${new Date(timecode * multiply).toLocaleDateString("en-US")} ${new Date(
    timecode * multiply
  ).toLocaleTimeString("en-US")}`;
