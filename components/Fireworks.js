/**
 * https://codepen.io/juliangarnier/pen/gmOwJX
 * custom by hexo-theme-yun @YunYouJun
 */
import React from 'react'
import anime from 'animejs'

export const Fireworks = () => {
  React.useEffect(() => {
    createFireworks({})
  }, [])
  return <canvas id='fireworks' className='fireworks'></canvas>
}

/**
   * 创建烟花
   * @param config
   */
function createFireworks(config) {
  const defaultColors = ['180, 233, 39', '0, 255, 204', '223, 96, 32']
  const defaultConfig = {
    colors: defaultColors,
    numberOfParticules: 30,
    orbitRadius: {
      min: 50,
      max: 100
    },
    circleRadius: {
      min: 10,
      max: 20
    },
    diffuseRadius: {
      min: 90,
      max: 180
    },
    animeDuration: {
      min: 1200,
      max: 2000
    }
  }
  config = Object.assign(defaultConfig, config)

  let pointerX = 0
  let pointerY = 0

  // sky blue
  const colors = config.colors || defaultColors

  const canvasEl = document.querySelector('.fireworks')
  const ctx = canvasEl.getContext('2d')

  /**
     * 设置画布尺寸
     */
  function setCanvasSize(canvasEl) {
    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight
    canvasEl.style.width = `${window.innerWidth}px`
    canvasEl.style.height = `${window.innerHeight}px`
  }

  /**
     * update pointer
     * @param {TouchEvent} e
     */
  function updateCoords(e) {
    pointerX =
        e.clientX ||
        (e.touches[0] ? e.touches[0].clientX : e.changedTouches[0].clientX)
    pointerY =
        e.clientY ||
        (e.touches[0] ? e.touches[0].clientY : e.changedTouches[0].clientY)
  }

  function setParticuleDirection(p) {
    const angle = (anime.random(0, 360) * Math.PI) / 180
    const value = anime.random(
      config.diffuseRadius.min,
      config.diffuseRadius.max
    )
    const radius = [-1, 1][anime.random(0, 1)] * value
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle)
    }
  }

  /**
     * 在指定位置创建粒子
     * @param {number} x
     * @param {number} y
     * @returns
     */
  function createParticule(x, y) {
    const p = {
      x,
      y,
      color: `rgba(${
          colors[anime.random(0, colors.length - 1)]
        },${
          anime.random(0.2, 0.8)
        })`,
      radius: anime.random(config.circleRadius.min, config.circleRadius.max),
      endPos: null,
      draw() {}
    }
    p.endPos = setParticuleDirection(p)
    p.draw = function() {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.fillStyle = p.color
      ctx.fill()
    }
    return p
  }

  function createCircle(x, y) {
    const p = {
      x,
      y,
      color: '#000',
      radius: 0.1,
      alpha: 0.5,
      lineWidth: 6,
      draw() {}
    }
    p.draw = function() {
      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.lineWidth = p.lineWidth
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return p
  }

  function renderParticule(anim) {
    for (let i = 0; i < anim.animatables.length; i++) { anim.animatables[i].target.draw() }
  }

  function animateParticules(x, y) {
    const circle = createCircle(x, y)
    const particules = []
    for (let i = 0; i < config.numberOfParticules; i++) { particules.push(createParticule(x, y)) }

    anime
      .timeline()
      .add({
        targets: particules,
        x(p) {
          return p.endPos.x
        },
        y(p) {
          return p.endPos.y
        },
        radius: 0.1,
        duration: anime.random(
          config.animeDuration.min,
          config.animeDuration.max
        ),
        easing: 'easeOutExpo',
        update: renderParticule
      })
      .add(
        {
          targets: circle,
          radius: anime.random(config.orbitRadius.min, config.orbitRadius.max),
          lineWidth: 0,
          alpha: {
            value: 0,
            easing: 'linear',
            duration: anime.random(1400, 1800)
          },
          duration: anime.random(2000, 3000),
          easing: 'easeOutExpo',
          update: renderParticule
        },
        0
      )
  }

  const render = anime({
    duration: Infinity,
    update: () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  })

  document.addEventListener(
    'mousedown',
    (e) => {
      render.play()
      updateCoords(e)
      animateParticules(pointerX, pointerY)
    },
    false
  )

  setCanvasSize(canvasEl)
  window.addEventListener(
    'resize',
    () => {
      setCanvasSize(canvasEl)
    },
    false
  )
}
