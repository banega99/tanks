let tank, turret, cannon, body, trackShoe, turret2, cannon2, body2, trackShoe2
let tank1 = document.querySelector(`#tank1`)
let tank2 = document.querySelector(`#tank2`)
// let bullet = document.querySelector(`#bullet`)
let explosion = document.querySelector(`#explosion`)
let shotExp = document.querySelector(`#shotExp`)
let power = document.querySelector(`#power`)
let explosionSound = new Audio('audio/medium-explosion-40472.mp3')
let shotSound = new Audio('audio/shot.mp3')
let movementsSound = new Audio('audio/move1.mp3')
let movementsSound1 = new Audio('audio/move.mp3')
let missSound = new Audio('audio/miss.mp3')
let turretSound = new Audio('audio/turret_move.mp3')
let container = document.querySelector(`.container`)
let name1 = document.querySelector('.name1')
let name2 = document.querySelector('.name2')
let fire1 = document.querySelector('.fire1')
let fire2 = document.querySelector('.fire2')
let smoke1 = document.querySelector('#smoke1')
let smoke2 = document.querySelector('#smoke2')
const toggleArrow = document.querySelector('#toggleArrow')
const guide = document.querySelector('#guide')


toggleArrow.addEventListener('click', function (e) {
    if (guide.classList.contains('toggle')) {
        guide.classList.remove('toggle')
        toggleArrow.setAttribute('src', 'images/guide_right.png')
    } else {
        guide.classList.add('toggle')
        toggleArrow.setAttribute('src', 'images/guide_left.png')
    }
})

// window.addEventListener('resize', function (e) {
//     console.log(e)
// })

let player1prompt
let player2prompt

player1prompt = prompt('Player 1 name:')
player2prompt = prompt('Player 2 name:')

let playerName1 = player1prompt ? player1prompt : 'Player 1'
let playerName2 = player2prompt ? player2prompt : 'Player 2'

name1.textContent = playerName1
name2.textContent = playerName2

let docBody = document.querySelector('body')
let bullet = document.createElement('div')
bullet.id = 'bullet'

let tank1HP = 1500
let hp1 = document.querySelector('.hp1')
hp1.style.width = `${tank1HP / 3}px`

let tank2HP = 1500
let hp2 = document.querySelector('.hp2')
hp2.style.width = `${tank2HP / 3}px`

let timerLabel = document.querySelector('.time')

let overlay = document.querySelector('#overlay')
let winner = document.querySelector('#winner')

function tankActive(active, passive) {
    tank = active
    tank1 = document.querySelector(`#tank${active}`)
    tank2 = document.querySelector(`#tank${passive}`)
    turret = document.querySelector(`#turret${active}`)
    cannon = document.querySelector(`#cannon${active}`)
    body = document.querySelector(`#body${active}`)
    trackShoe = document.querySelector(`#track-shoe${active}`)
    turret2 = document.querySelector(`#turret${passive}`)
    cannon2 = document.querySelector(`#cannon${passive}`)
    body2 = document.querySelector(`#body${passive}`)
    trackShoe2 = document.querySelector(`#track-shoe${passive}`)
    // cannon.style.transform = ''
    if (getComputedStyle(cannon).transform !== 'none') bullet.style.transform = getComputedStyle(cannon).transform
    if (getComputedStyle(cannon).transform !== 'none') shotExp.style.transform = getComputedStyle(cannon).transform
    // bulletPosition()
    if (tank == 2) {
        bullet.style.backgroundImage = `url('images/orange_bullet_right.png')`
        shotExp.style.backgroundImage = `url('images/shotExp_right.png')`
    }
    else {
        bullet.style.backgroundImage = `url('images/orange_bullet.png')`
        shotExp.style.backgroundImage = `url('images/shotExp.png')`
    }
}

function bulletPosition() {
    let cannonLeft = cannon.getBoundingClientRect().left
    let cannonTop = cannon.getBoundingClientRect().top
    let cannonBottom = cannon.getBoundingClientRect().bottom
    let cannonRight = cannon.getBoundingClientRect().right
    if (tank == 1) {
        bullet.style.left = `${cannon.getBoundingClientRect().right + 5}px`
        bullet.style.top = `${cannonTop + ((cannonBottom - cannonTop) / 2.5)}px`
        shotExp.style.left = `${cannonRight - 10}px`
        shotExp.style.top = `${cannonTop - shotExp.getBoundingClientRect().height / 2.6}px`
        power.style.left = `${tank1.getBoundingClientRect().left + tank1.getBoundingClientRect().width / 3}px`
        power.style.top = `${tank1.getBoundingClientRect().top - 20}px`
    } else {
        bullet.style.left = `${cannonLeft - 10}px`
        bullet.style.top = `${cannonTop + ((cannonBottom - cannonTop) / 2.25)}px`
        shotExp.style.left = `${cannonLeft - 25}px`
        shotExp.style.top = `${cannonTop - shotExp.getBoundingClientRect().height / 3.7}px`
        power.style.left = `${tank1.getBoundingClientRect().left + tank1.getBoundingClientRect().width / 2}px`
        power.style.top = `${tank1.getBoundingClientRect().top - 20}px`
    }
}

function end(player) {
    window.removeEventListener('keydown', movements)
    window.removeEventListener('keyup', shoot)
    overlay.style.visibility = 'visible'
    winner.innerHTML = player == 'draw' ? `<h3>Draw!</h3><p id="reset">click here for new game</p>` : `<h3>${player} won!</h3><p id="reset">click here for new game</p>`
    overlay.addEventListener('click', resetGame)
}

function startTimer() {
    function tick() {
        if (time == 0) {
            clearInterval(timer)
            if (tank1HP > tank2HP) {
                end(playerName1)
            } else if (tank2HP > tank1HP) {
                end(playerName2)
            } else end('draw')
        }
        let seconds = String(time % 60).padStart(2, '0')
        let minutes = String(Math.floor(time / 60)).padStart(2, '0')
        timerLabel.textContent = `${minutes}:${seconds}`
        time--
    }
    let time = 120
    tick()
    const timer = setInterval(tick, 1000)
    return timer
}

function resetGame(e) {
    if (e.target.id !== 'reset') return
    power.style.visibility = 'hidden'
    power.style.width = '0px'
    tank1HP = 1500
    hp1.style.width = `${tank1HP / 3}px`
    hp1.style.backgroundColor = 'green'
    smoke1.style.visibility = 'hidden'
    fire1.style.visibility = 'hidden'
    cannon.style.removeProperty('transform')
    tank2HP = 1500
    hp2.style.width = `${tank2HP / 3}px`
    hp2.style.backgroundColor = 'green'
    smoke2.style.visibility = 'hidden'
    fire2.style.visibility = 'hidden'
    cannon2.style.removeProperty('transform')
    overlay.style.visibility = 'hidden'

    tankActive(1, 2)
    if (timer) clearInterval(timer)
    timer = startTimer()
    i1 = 0 //Movements counter tank1
    i2 = 0 //Movements counter tank2
    k = 0 //Cannon rotation counter
    g = 0 //Right cannon rotation counter up
    z = 0 //Right cannon rotation counter down
    l = 0 //Power counter
    tank1.style.transform = `translateX(${i1}px)`
    tank2.style.transform = `translateX(${i2}px)`
    window.addEventListener('keydown', movements)
    window.addEventListener('keyup', shoot)
}

//Timer
tankActive(1, 2)
timer = startTimer()


tank1.style.visibility = 'visible'
tank1.style.transform = `translate(0px)`
tank2.style.transform = 'translate(0px)'
tank2.style.visibility = 'visible'
let n = 0
const trackShoeUp = setInterval(function () {
    n++
    if (n == 9) {
        clearInterval(trackShoeUp)
        tank1.style.transition = 'all 0.4s'
        tank2.style.transition = 'all 0.4s'
    }
    if (n % 2 === 0) {
        trackShoe.style.transform = `translateY(-2px)`
        trackShoe2.style.transform = `translateY(-2px)`
    }
    else {
        trackShoe.style.transform = `translateY(1px)`
        trackShoe2.style.transform = `translateY(1px)`
    }
}, 80)

let i1 = 0 //Movements counter tank1
let i2 = 0 //Movements counter tank2
let k = 0 //Cannon rotation counter
let g = 0 //Right cannon rotation counter up
let z = 0 //Right cannon rotation counter down
let l = 0 //Power counter

function moveTank() {
    movementsSound.play()
    if (tank == 1) {
        tank1.style.transform = `translateX(${i1}px)`
    } else {
        tank1.style.transform = `translateX(${i2}px)`
    }

    let n = 0
    const trackShoeUp = setInterval(function () {
        bulletPosition()
        n++
        if (n == 5) clearInterval(trackShoeUp)
        if (n % 2 === 0) trackShoe.style.transform = `translateY(-2px)`
        else trackShoe.style.transform = `translateY(1px)`
    }, 80)
}

function rotateCannon() {
    if (tank == 1 && k > -7 && k < 7) {
        turretSound.play()
        cannon.style.transform = `rotate(${k}deg) translateY(${k}px)`;
        bulletPosition()
        bullet.style.transform = `rotate(${k}deg) translateY(${k}px)`;
        shotExp.style.transform = `rotate(${k}deg) translateY(${k}px)`;
    } else if (tank == 2 && g >= 0 && g < 7 && g > -7) {
        turretSound.play()
        cannon.style.transform = `rotate(${g}deg) translateY(-${g}px)`;
        bulletPosition()
        bullet.style.transform = `rotate(${g}deg) translateY(-${g}px)`;
        shotExp.style.transform = `rotate(${g}deg) translateY(-${g}px)`;

    } else if (tank == 2 && g <= 0 && g < 7 && g > -7) {
        turretSound.play()
        cannon.style.transform = `rotate(-${z}deg) translateY(${z}px)`;
        bulletPosition()
        bullet.style.transform = `rotate(-${z}deg) translateY(${z}px)`
        shotExp.style.transform = `rotate(-${z}deg) translateY(${z}px)`
    }
}

function movements(e) {
    if (e.key === 'ArrowRight') {
        if (tank == 2 &&
            tank1.getBoundingClientRect().right >= container.getBoundingClientRect().right - 10) return
        e.preventDefault()
        if (tank == 1 && i1 <= 60) {
            i1 += 10
            moveTank()
        }
        else if(tank == 2 && i2 <= 60) {
            i2 += 10
            moveTank()
        }
        // moveTank()
    } else if (e.key === 'ArrowLeft') {
        if (tank == 1 &&
            tank1.getBoundingClientRect().left <= container.getBoundingClientRect().left) return
        e.preventDefault()
        if (tank == 1 && i1 >= -60) {
            i1 -= 10
            moveTank()
        }
        else if(tank == 2 && i2 >= -60) {
            i2 -= 10
            moveTank()
        }
        // moveTank()
    } else if (e.key === 'ArrowUp') {
        if (tank == 1 && k > -7) k--
        else if (tank == 2 && g < 7) {
            g++
            z--
        }
        rotateCannon()
    } else if (e.key === 'ArrowDown') {
        if (tank == 1 && k < 7) k++
        else if (tank == 2 && g > -7) {
            g--
            z++
        }
        rotateCannon()
    } else if (e.code === 'Space' && l < 9) {
        bulletPosition()
        if (l >= 8) {
            l = 1
            power.style.width = `${l}px`
        }
        else {
            power.style.visibility = 'visible'
            l++
            power.style.width = `${8 * l}px`
        }
    }
}

function reset(bulletDrop, bulletCurve) {
    clearInterval(bulletDrop)
    clearInterval(bulletCurve)
    bullet.style.removeProperty('transform')
    if (docBody.querySelector('#bullet')) docBody.removeChild(bullet)
    if (tank == 1) tankActive(2, 1)
    else tankActive(1, 2)
    l = 0
    setTimeout(function () {
        explosion.style.visibility = 'hidden'
        if(tank2HP > 0 && tank1HP > 0){
            window.addEventListener('keydown', movements)
            window.addEventListener('keyup', shoot)
        }
    }, 200)

}

function hitAnimations(bulletEnd, bulletTop, target) {
    explosion.style.left = target == body2 && tank == 2 ? `${bulletEnd - 50}px` : `${bulletEnd - 25}px`
    explosion.style.top = `${bulletTop - 20}px`
    explosion.style.visibility = 'visible'
    explosionSound.play()
}

function healthAnimations(hpAmount) {
    if (tank == 1) {
        tank2HP -= hpAmount
        if (hpAmount >= tank2HP) {
            tank2HP = 0
            if (tank2HP == 0) end(playerName1)
        }
        hp2.style.width = `${tank2HP / 3}px`
        if (tank2HP <= 1000 && tank2HP > 500) {
            hp2.style.backgroundColor = 'yellowgreen'
            smoke2.style.visibility = 'visible'

        } else if (tank2HP <= 500) {
            hp2.style.backgroundColor = 'red'
            fire2.style.visibility = 'visible'
        }
    }

    else {
        tank1HP -= hpAmount
        if (hpAmount >= tank1HP) {
            tank1HP = 0
            if (tank1HP == 0) end(playerName2)
        }
        hp1.style.width = `${tank1HP / 3}px`
        if (tank1HP <= 1000 && tank1HP > 500) {
            hp1.style.backgroundColor = 'yellowgreen'
            smoke1.style.visibility = 'visible'
        }
        else if (tank1HP <= 500) {
            hp1.style.backgroundColor = 'red'
            fire1.style.visibility = 'visible'
        }
    }
}

function healthReduce(target) {
    switch (target) {
        case cannon2:
            healthAnimations(l * 20)
            break;
        case body2:
            healthAnimations(l * 28)
            break;
        case turret2:
            healthAnimations(l * 25)
            break;
        case trackShoe2:
            healthAnimations(l * 18)
            break;
        default:
            break;
    }
}

function shoot(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
    }
    if (e.code === 'Space' && l <= 8) {
        docBody.appendChild(bullet)
        // bulletPosition()
        shotSound.play()
        window.removeEventListener('keydown', movements)
        window.removeEventListener('keyup', shoot)
        shotExp.style.visibility = 'visible'
        setTimeout(function () {
            power.style.visibility = 'hidden'
            shotExp.style.visibility = 'hidden'
            bullet.style.visibility = 'visible'
            // bulletPosition()
        }, 60)
        let bulletDrop = setInterval(function () {
            //Bullet dimensions
            let bulletLeft = bullet.getBoundingClientRect().left
            let bulletRight = bullet.getBoundingClientRect().right
            let bulletTop = bullet.getBoundingClientRect().top
            let bulletBottom = bullet.getBoundingClientRect().bottom
            //Container dimensions
            let containerLeft = container.getBoundingClientRect().left
            let containerRight = container.getBoundingClientRect().right
            let containerBottom = container.getBoundingClientRect().bottom
            if (bulletBottom >= cannon2.getBoundingClientRect().top && bulletBottom <= cannon2.getBoundingClientRect().bottom && bulletRight >= cannon2.getBoundingClientRect().left && bulletRight <= cannon2.getBoundingClientRect().right) {
                healthReduce(cannon2)
                hitAnimations(bulletRight, bulletTop, cannon2)
                reset(bulletDrop, bulletCurve)
                return
            }
            else if (bulletBottom >= body2.getBoundingClientRect().top && bulletBottom <= body2.getBoundingClientRect().bottom && bulletRight >= body2.getBoundingClientRect().left && bulletRight <= body2.getBoundingClientRect().right) {
                healthReduce(body2)
                hitAnimations(bulletRight, bulletTop, body2)
                reset(bulletDrop, bulletCurve)
                return
            }
            else if (bulletBottom >= trackShoe2.getBoundingClientRect().top && bulletBottom <= trackShoe2.getBoundingClientRect().bottom && bulletRight >= trackShoe2.getBoundingClientRect().left && bulletRight <= trackShoe2.getBoundingClientRect().right) {
                healthReduce(trackShoe2)
                hitAnimations(bulletRight, bulletTop, trackShoe2)
                reset(bulletDrop, bulletCurve)
                return
            }
            else if (bulletBottom >= turret2.getBoundingClientRect().top && bulletBottom <= turret2.getBoundingClientRect().bottom && bulletRight >= turret2.getBoundingClientRect().left && bulletRight <= turret2.getBoundingClientRect().right) {
                healthReduce(turret2)
                hitAnimations(bulletRight, bulletTop, turret2)
                reset(bulletDrop, bulletCurve)
                return
            }
            else if (bulletRight >= containerRight || bulletTop >= containerBottom || bulletLeft <= containerLeft) {
                // missSound.play()
                reset(bulletDrop, bulletCurve)
                return
            }
            if (tank == 1) {
                bullet.style.transform += `translate(${l}px)`
            }
            else if (tank == 2) {
                bullet.style.transform += `translate(-${l}px)`
            }
        }, 10)
        let bulletCurve = setInterval(function () {
            if (tank == 1) bullet.style.transform += `rotate(${9 - l}deg`
            else bullet.style.transform += `rotate(-${9 - l}deg`
        }, 200)
    }
}
window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()
    }
}
)

window.addEventListener('keydown', movements)
window.addEventListener('keyup', shoot)
