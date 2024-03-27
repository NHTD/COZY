/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      fontFamily: {
        'main': ['Poppins', 'sans-serif;']
      },
      extend: {
        width: {
          'main': '1520px'
        },
        colors: {
          'main': '#243c5a',
          'main-text': '#001C66',
          'main-bg': '#F6FCFF'
        },
        flex: {
          '2': '2 2 0%',
          '3': '3 3 0%',
          '4': '4 4 0%',
          '5': '5 5 0%',
          '6': '6 6 0%',
          '7': '7 7 0%',
          '8': '8 8 0%'
        },
        boxShadow: {
          '3xl': '10x 20px 3px #ffff',
        },
        backgroundSize: {
          'auto': 'auto',
          'cover': 'cover',
          'contain': 'contain',
          '50%': '50%',
          '100%': '100%',
          '200%': '200%',
          '300%': '300%',
          '16': '4rem',
        },
        keyframes: {
          'slide-top': {
            '0%': {
              '-webkit-transform': 'translateY(0)',
              transform: 'translateY(0)'
            },
            '100%': {
             '-webkit-transform': 'translateY(-4px)',
              transform: 'translateY(-4px)'
            }
          },
          'shadow-drop-2-center': {
            '0%': {
              '-webkit-transform': 'translateZ(0)',
              transform: 'translateZ(0)',
              '-webkit-box-shadow': '0 0 0 0 rgba(0, 0, 0, 0)',
              'box-shadow': '0 0 0 0 rgba(0, 0, 0, 0)'
            },
            '100%': {
              '-webkit-transform': 'translateZ(50px)',
              transform: 'translateZ(50px)',
              '-webkit-box-shadow': '0 0 20px 0px rgba(0, 0, 0, 0.35)',
              'box-shadow': '0 0 20px 0px rgba(0, 0, 0, 0.35)'
            }
          },
          'slide-top-sm': {
            '0%': {
              '-webkit-transform': 'translateY(4px)',
              transform: 'translateY(4px)'
            },
            '100%': {
             '-webkit-transform': 'translateY(-4px)',
              transform: 'translateY(-4px)'
            }
          },
        },
        animation:{
          'slide-top': 'slide-top 0.9s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
          'slide-top-sm': 'slide-top-sm 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
          'shadow-drop-2-center': 'shadow-drop-2-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
        }
      }
    },
    plugins: [
      require('@tailwindcss/line-clamp')
    ],
  }

