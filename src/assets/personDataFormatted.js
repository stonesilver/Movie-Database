// export const personDataFormatted = (
//   cast,
//   sortedYear,
//   sortedCast,
//   moviesKnownFor,
//   crew,
//   productionYear,
//   productionList,
//   crewYear,
//   crewList,
//   directingList,
//   directingYear,
//   sortedCastYear,
//   productionListYear,
//   crewListYear,
//   directingListYear
// ) => {
//   if (cast) {
//     cast.forEach((hcast) => {
//       if (
//         !sortedYear.includes(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         )
//       ) {
//         if (hcast.release_date || hcast.first_air_date) {
//           let ket = cast.filter(
//             (jcast) =>
//               new Date(
//                 hcast.release_date || hcast.first_air_date
//               ).getFullYear() ===
//               new Date(jcast.release_date || jcast.first_air_date).getFullYear()
//           );
//           sortedCast.push(ket);
//           sortedYear.push(
//             new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//           );
//         } else {
//           let ket = cast.filter(
//             (jcast) => !jcast.release_date && !jcast.first_air_date
//           );

//           sortedCast.push(ket);
//           sortedYear.push(
//             new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//           );
//         }
//       }
//     });
//   }

//   if (cast) {
//     moviesKnownFor = cast
//       .sort((a, b) => b.vote_count - a.vote_count)
//       .filter((cast, index) => index <= 8);
//   }
//   if (crew) {
//     let productionCast = crew.filter(
//       (prod) => prod.department === 'Production'
//     );
//     productionCast.forEach((hcast) => {
//       if (
//         !productionYear.includes(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         )
//       ) {
//         if (hcast.release_date || hcast.first_air_date) {
//           let ket = productionCast.filter(
//             (jcast) =>
//               new Date(
//                 hcast.release_date || hcast.first_air_date
//               ).getFullYear() ===
//               new Date(jcast.release_date || jcast.first_air_date).getFullYear()
//           );
//           productionList.push(ket);
//           productionYear.push(
//             new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//           );
//         } else {
//           let ket = productionCast.filter(
//             (jcast) => !jcast.release_date && !jcast.first_air_date
//           );

//           productionList.push(ket);
//           productionYear.push(
//             new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//           );
//         }
//       }
//     });
//   }
//   if (crew) {
//     let crewCast = crew.filter((prod) => prod.department === 'Crew');
//     crewCast.forEach((hcast) => {
//       if (
//         !crewYear.includes(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         )
//       ) {
//         let ket = crewCast.filter(
//           (jcast) =>
//             new Date(
//               hcast.release_date || hcast.first_air_date
//             ).getFullYear() ===
//             new Date(jcast.release_date || jcast.first_air_date).getFullYear()
//         );
//         crewList.push(ket);
//         crewYear.push(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         );
//       }
//     });
//   }

//   if (crew) {
//     let directingCast = crew.filter((prod) => prod.department === 'Directing');
//     directingCast.forEach((hcast) => {
//       if (
//         (hcast.release_date === '' || hcast.first_air_date === '') &&
//         !crewYear.includes(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         )
//       ) {
//         let ket = directingCast.filter(
//           (jcast) => jcast.release_date === '' || jcast.first_air_date === ''
//         );
//         directingList.push(ket);
//         directingYear.push();
//       }
//       if (
//         !crewYear.includes(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         )
//       ) {
//         let ket = directingCast.filter(
//           (jcast) =>
//             new Date(
//               hcast.release_date || hcast.first_air_date
//             ).getFullYear() ===
//             new Date(jcast.release_date || jcast.first_air_date).getFullYear()
//         );
//         directingList.push(ket);
//         directingYear.push(
//           new Date(hcast.release_date || hcast.first_air_date).getFullYear()
//         );
//       }
//     });
//   }

//   if (sortedCast.length) {
//     sortedCastYear = sortedCast.map((item) =>
//       item.sort(
//         (a, b) =>
//           parseInt(
//             a.release_date
//               ? a.release_date.replace(/-/g, '')
//               : a.first_air_date
//               ? a.first_air_date.replace(/-/g, '')
//               : 0
//           ) -
//           parseInt(
//             b.release_date
//               ? b.release_date.replace(/-/g, '')
//               : b.first_air_date
//               ? b.first_air_date.replace(/-/g, '')
//               : 0
//           )
//       )
//     );
//   }

//   if (productionList.length) {
//     productionListYear = productionList.map((item) =>
//       item.sort(
//         (a, b) =>
//           parseInt(
//             a.release_date
//               ? a.release_date.replace(/-/g, '')
//               : a.first_air_date
//               ? a.first_air_date.replace(/-/g, '')
//               : 0
//           ) -
//           parseInt(
//             b.release_date
//               ? b.release_date.replace(/-/g, '')
//               : b.first_air_date
//               ? b.first_air_date.replace(/-/g, '')
//               : 0
//           )
//       )
//     );
//   }

//   if (crewList.length) {
//     crewListYear = crewList.map((item) =>
//       item.sort(
//         (a, b) =>
//           parseInt(
//             a.release_date
//               ? a.release_date.replace(/-/g, '')
//               : a.first_air_date
//               ? a.first_air_date.replace(/-/g, '')
//               : 0
//           ) -
//           parseInt(
//             b.release_date
//               ? b.release_date.replace(/-/g, '')
//               : b.first_air_date
//               ? b.first_air_date.replace(/-/g, '')
//               : 0
//           )
//       )
//     );
//   }

//   if (directingList.length) {
//     directingListYear = directingList.map((item) =>
//       item.sort(
//         (a, b) =>
//           parseInt(
//             a.release_date
//               ? a.release_date.replace(/-/g, '')
//               : a.first_air_date
//               ? a.first_air_date.replace(/-/g, '')
//               : 0
//           ) -
//           parseInt(
//             b.release_date
//               ? b.release_date.replace(/-/g, '')
//               : b.first_air_date
//               ? b.first_air_date.replace(/-/g, '')
//               : 0
//           )
//       )
//     );
//   }

//   if (sortedCastYear.length) {
//     sortedCastYear = sortedCastYear.sort(
//       (a, b) =>
//         parseInt(
//           b[0].release_date
//             ? b[0].release_date.replace(/-/g, '')
//             : b[0].first_air_date
//             ? b[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         ) -
//         parseInt(
//           a[0].release_date
//             ? a[0].release_date.replace(/-/g, '')
//             : a[0].first_air_date
//             ? a[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         )
//     );
//   }

//   if (productionListYear.length) {
//     productionListYear = productionListYear.sort(
//       (a, b) =>
//         parseInt(
//           b[0].release_date
//             ? b[0].release_date.replace(/-/g, '')
//             : b[0].first_air_date
//             ? b[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         ) -
//         parseInt(
//           a[0].release_date
//             ? a[0].release_date.replace(/-/g, '')
//             : a[0].first_air_date
//             ? a[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         )
//     );
//   }

//   if (crewListYear.length) {
//     crewListYear = crewListYear.sort(
//       (a, b) =>
//         parseInt(
//           b[0].release_date
//             ? b[0].release_date.replace(/-/g, '')
//             : b[0].first_air_date
//             ? b[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         ) -
//         parseInt(
//           a[0].release_date
//             ? a[0].release_date.replace(/-/g, '')
//             : a[0].first_air_date
//             ? a[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         )
//     );
//   }

//   if (directingListYear.length) {
//     directingListYear = directingListYear.sort((a, b) => {
//       if (a.length < 1 || b.length < 1) {
//         return a - b;
//       }
//       // if (b.length < 1) {
//       //   return;
//       // }
//       return (
//         parseInt(
//           b[0].release_date
//             ? b[0].release_date.replace(/-/g, '')
//             : b[0].first_air_date
//             ? b[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         ) -
//         parseInt(
//           a[0].release_date
//             ? a[0].release_date.replace(/-/g, '')
//             : a[0].first_air_date
//             ? a[0].first_air_date.replace(/-/g, '')
//             : 500000000
//         )
//       );
//     });
//   }
// };

export const sortedCastYearNew = (cast) => {
  let sortedYear = [];
  let sortedCast = [];
  if (cast) {
    cast.forEach((hcast) => {
      if (
        !sortedYear.includes(
          new Date(hcast.release_date || hcast.first_air_date).getFullYear()
        )
      ) {
        if (hcast.release_date || hcast.first_air_date) {
          let ket = cast.filter(
            (jcast) =>
              new Date(
                hcast.release_date || hcast.first_air_date
              ).getFullYear() ===
              new Date(jcast.release_date || jcast.first_air_date).getFullYear()
          );
          sortedCast.push(ket);
          sortedYear.push(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          );
        } else {
          let ket = cast.filter(
            (jcast) => !jcast.release_date && !jcast.first_air_date
          );

          sortedCast.push(ket);
          sortedYear.push(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          );
        }
      }
    });
  }

  if (sortedCast.length) {
    sortedCast = sortedCast.map((item) =>
      item.sort(
        (a, b) =>
          parseInt(
            a.release_date
              ? a.release_date.replace(/-/g, '')
              : a.first_air_date
              ? a.first_air_date.replace(/-/g, '')
              : 0
          ) -
          parseInt(
            b.release_date
              ? b.release_date.replace(/-/g, '')
              : b.first_air_date
              ? b.first_air_date.replace(/-/g, '')
              : 0
          )
      )
    );
  }

  return sortedCast.length
    ? sortedCast.sort(
        (a, b) =>
          parseInt(
            b[0].release_date
              ? b[0].release_date.replace(/-/g, '')
              : b[0].first_air_date
              ? b[0].first_air_date.replace(/-/g, '')
              : 500000000
          ) -
          parseInt(
            a[0].release_date
              ? a[0].release_date.replace(/-/g, '')
              : a[0].first_air_date
              ? a[0].first_air_date.replace(/-/g, '')
              : 500000000
          )
      )
    : '';
};

export const productionCrewDirecting = (crew, filterType) => {
  let productionCast = [];
  let productionYear = [];
  let productionList = [];
  let productionListYear = [];
  if (crew) {
    productionCast = crew.filter((prod) => prod.department === filterType);
    productionCast.forEach((hcast) => {
      if (
        !productionYear.includes(
          new Date(hcast.release_date || hcast.first_air_date).getFullYear()
        )
      ) {
        if (hcast.release_date || hcast.first_air_date) {
          let ket = productionCast.filter(
            (jcast) =>
              new Date(
                hcast.release_date || hcast.first_air_date
              ).getFullYear() ===
              new Date(jcast.release_date || jcast.first_air_date).getFullYear()
          );
          productionList.push(ket);
          productionYear.push(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          );
        } else {
          let ket = productionCast.filter(
            (jcast) => !jcast.release_date && !jcast.first_air_date
          );

          productionList.push(ket);
          productionYear.push(
            new Date(hcast.release_date || hcast.first_air_date).getFullYear()
          );
        }
      }
    });
  }

  if (productionList.length) {
    productionListYear = productionList.map((item) =>
      item.sort(
        (a, b) =>
          parseInt(
            a.release_date
              ? a.release_date.replace(/-/g, '')
              : a.first_air_date
              ? a.first_air_date.replace(/-/g, '')
              : 0
          ) -
          parseInt(
            b.release_date
              ? b.release_date.replace(/-/g, '')
              : b.first_air_date
              ? b.first_air_date.replace(/-/g, '')
              : 0
          )
      )
    );
  }

  return productionListYear.length
    ? productionListYear.sort(
        (a, b) =>
          parseInt(
            b[0].release_date
              ? b[0].release_date.replace(/-/g, '')
              : b[0].first_air_date
              ? b[0].first_air_date.replace(/-/g, '')
              : 500000000
          ) -
          parseInt(
            a[0].release_date
              ? a[0].release_date.replace(/-/g, '')
              : a[0].first_air_date
              ? a[0].first_air_date.replace(/-/g, '')
              : 500000000
          )
      )
    : '';
};
