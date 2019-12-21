#include <stdio.h>

void main() {
  int omoons[4][6] = {
    {-8, -10, 0, 0, 0, 0},
    { 5, 5, 10, 0, 0, 0},
    { 2, -7, 3, 0, 0, 0},
    { 9, -8, -3, 0, 0, 0}
  };

  int moons[4][6] = {
    {-8, -10, 0, 0, 0, 0},
    { 5, 5, 10, 0, 0, 0},
    { 2, -7, 3, 0, 0, 0},
    { 9, -8, -3, 0, 0, 0}
  };

  // int omoons[4][6] = {
  //   { -13, -13, -13, 0, 0, 0 },
  //   { 5, -8, -3, 0, 0, 0 },
  //   { -6, -10, -3, 0, 0, 0 },
  //   { 0, 5, -5, 0, 0, 0 },
  // };

  // int moons[4][6] = {
  //   { -13, -13, -13, 0, 0, 0 },
  //   { 5, -8, -3, 0, 0, 0 },
  //   { -6, -10, -3, 0, 0, 0 },
  //   { 0, 5, -5, 0, 0, 0 },
  // };

  int *pairs[6][2] = {
    { moons[0], moons[1] },
    { moons[0], moons[2] },
    { moons[0], moons[3] },
    { moons[1], moons[2] },
    { moons[1], moons[3] },
    { moons[2], moons[3] }
  };
  int steps = 0;

  while (1)
  {
    for (int i = 0; i < 6; i++) {
      for (int c = 0; c < 3; c++) {
        if ( (pairs[i][0])[c] > (pairs[i][1])[c]) {
          (pairs[i][0])[c + 3]++;
          (pairs[i][1])[c + 3]--;
        }
        if ( (pairs[i][0])[c] < (pairs[i][1])[c]) {
          (pairs[i][0])[c + 3]--;
          (pairs[i][1])[c + 3]++;
        }
      }
    }

    int notFound = 0;

    for (int i = 0; i < 4; i++) {
      moons[i][0] = moons[i][0] + moons[i][3];
      moons[i][1] = moons[i][1] + moons[i][4];
      moons[i][2] = moons[i][2] + moons[i][5];

      if (moons[i][0] != omoons[i][0]
        || moons[i][1] != omoons[i][1]
        || moons[i][2] != omoons[i][2]
        || moons[i][3] != omoons[i][3]
        || moons[i][4] != omoons[i][4]
        || moons[i][5] != omoons[i][5]) {
          notFound = 1;
      }
    }
    
    if (steps == 0) {
      notFound = 1;
    }

    if (!notFound) {
      printf("%d\n", steps);
      break;
    }

    if (steps % 1000000 == 0) {
      printf("%d\n", steps);
    }

    steps++;
  }

  
  
}