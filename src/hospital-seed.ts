// // Example in a service
// async seed() {
//   const hospital = this.hospitalRepo.create({
//     name: 'Lagos General Hospital',
//     location: {
//       type: 'Point',
//       coordinates: [3.3792, 6.5244], // lng, lat → Lagos approx
//     },
//   });
//   await this.hospitalRepo.save(hospital);
// }