import * as Font from 'expo-font'

export const fonts = {
  openSan: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
    sfuiSemibold: 'SF_UI_Text_Semibold',
    interBold: 'Inter_900',
    interMedium: 'Inter_500',
    interSemibold: 'Inter_600',
  },
}

// fonts preloading
export const fontsAll = [
  {
    openSans_regular: require('../../assets/fonts/OpenSans-Regular.ttf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/OpenSans-Italic.ttf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/OpenSans-Semibold.ttf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/OpenSans-SemiboldItalic.ttf'),
  },
  {
    openSans_bold: require('../../assets/fonts/OpenSans-Bold.ttf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/OpenSans-BoldItalic.ttf'),
  },
  {
    SF_UI_Text_Semibold: require('../../assets/fonts/SF-UI-Text-Semibold.ttf'),
  },
  {
    Inter_900: require('../../assets/fonts/Inter-Black.ttf'),
  },
  {
    Inter_500: require('../../assets/fonts/Inter-Medium.ttf'),
  },
  {
    Inter_600: require('../../assets/fonts/Inter-SemiBold.ttf'),
  },
]
export const fontAssets = fontsAll.map((x) => Font.loadAsync(x))
