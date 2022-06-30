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

// filter groups array
export const filterGroupsByInput = (groups, input) => {
  const inputChars = input.split("");

  return groups.filter((group) => {
    return inputChars.every((char) =>
      group.name.toLowerCase().includes(char.toLowerCase())
    );
  });
};

// Add time
export function addTime(startTime, addMinutes) {
  const time = startTime.split(":");

  time[1] = +time[1] + addMinutes;
  time[0] = +time[0] + Math.floor(time[1] / 60);
  time[1] %= 60;

  return `${time[0]}:${time[1] < 10 ? "0" + time[1] : time[1]}`;
}
