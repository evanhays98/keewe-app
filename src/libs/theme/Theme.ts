const basicColors = {
  background: '#fff',
  blueGradiant: `-webkit-linear-gradient(100deg, ${'#1b5160'} 0%, ${'#3394ae'} 100%)`,
  blueLightGradiant: `-webkit-linear-gradient(100deg, ${'#5a92a1'} 0%, ${'#57c2e0'} 100%)`,
  blue: '#22778e',
  black: '#1a1d1f',
  red: '#e05767',
  midNightBlue: '#0c1842',
  blueHover: '#08262e',
  lightGray: '#2d3134',
  transparent: '#FFFFFF00',
  green: '#7bde74',
  transparentDarkGray: 'rgba(30,39,51,0.8)',
};

export type Colors = keyof typeof basicColors;
export const ColorsString = {
  background: 'background' as Colors,
  red: 'red' as Colors,
  green: 'green' as Colors,
  midNightBlue: 'midNightBlue' as Colors,
  blue: 'blue' as Colors,
  blueHover: 'blueHover' as Colors,
  lightGray: 'lightGray' as Colors,
  black: 'black' as Colors,
  transparent: 'transparent' as Colors,
  blueGradiant: 'blueGradiant' as Colors,
  blueLightGradiant: 'blueLightGradiant' as Colors,
};

export const theme = {
  colors: basicColors,
  marginBase: 8,
  basicFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  media: {
    mobile: '@media (max-width: 768px)',
    tablet: '@media (max-width: 1024px)',
    desktop: '@media (max-width: 1440px)',
  },
  boxShadow: {
    std: `0px 0px 10px 4px ${basicColors.black}55`,
  },
  icon: {
    large: 24,
    normal: 20,
    low: 16,
  },
  borderRadius: {
    std: 8,
    large: 16,
  },
  boxWidth: {
    large: 1440,
    normal: 1024,
    small: 768,
    tiny: 530,
  },
  fonts: {
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 900,
      fontSize: 40,
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 900,
      fontSize: 30,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 900,
      fontSize: 20,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 700,
      fontSize: 16,
      lineHeight: 1.5,
    },
    body: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
    },
    caption: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5,
    },
    caption2: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 500,
      fontSize: 12,
      lineHeight: 1.5,
    },
    label: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: 15,
    },
    calendarText: {
      fontFamily: 'Montserrat, sans-serif',
      color: basicColors.black,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.5,
    },
  },
};

export type Theme = typeof theme;
