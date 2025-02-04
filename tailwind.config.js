module.exports = {
  theme: {
    extend: {
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '100' },
          '60%, 100%': { strokeDashoffset: '0' }
        }
      },
      animation: {
        draw: 'draw 2s ease-in-out infinite'
      }
    }
  }
} 