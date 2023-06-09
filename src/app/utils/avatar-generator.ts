export const avatarGenerator = () => {
  let random = (Math.random() + 1).toString(36).substring(7);
  return `https://robohash.org/${random}`;
};
