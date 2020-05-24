const generateMessages = (user, text) => {
  return {
    user,
    text,
    createdAt: new Date().getTime(),
  };
};

module.exports = { generateMessages };
