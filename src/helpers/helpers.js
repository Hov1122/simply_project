// generates random hex color
export const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// filter users array
export const filterUsersByInput = (users, input) => {
  const inputChars = input.split("");

  return users.filter((user) => {
    return inputChars.every((char) =>
      user.firstName.toLowerCase().includes(char.toLowerCase())
    );
  });
};
