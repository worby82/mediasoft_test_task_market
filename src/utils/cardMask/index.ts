const cardMask = (mask: string, value: string) => {
  return `${value.replace(/\s/g, "")}${mask
    .replace(/\s/g, "")
    .slice(value.replace(/\s/g, "").length)}`
    .replace(/([\d#]{4})/g, "$1 ")
    .trim();
};

export default cardMask;