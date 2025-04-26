const randomAnimalIndex = (list = []) => {
    const inactive = list.filter(animal => !animal.active);
    if (inactive.length === 0) return -1;
    const randomIndex = Math.floor(Math.random() * inactive.length);
    return list.indexOf(inactive[randomIndex]);
  };

export default randomAnimalIndex;
