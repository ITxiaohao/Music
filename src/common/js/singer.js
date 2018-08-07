// export default class Singer {
//   constructor({ id, name, avatars }) {
//     this.id = id;
//     this.name = name;
//     this.avatar = avatars;
//   }
// }

export default class Singer {
  constructor({ id, name, avatars, aliaName }) {
    this.id = id;
    this.name = name;
    this.avatars = avatars;
    this.aliaName = aliaName;
  }
}
