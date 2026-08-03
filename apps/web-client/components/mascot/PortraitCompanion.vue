<template>
  <aside
    v-if="!isHidden"
    ref="stageRef"
    class="portrait-companion"
    :class="{ 'is-reacting': activeZone, 'is-shy': activeZone === 'chest' }"
    aria-label="互动看板娘"
    @pointermove="handleLocalPointer"
    @pointerleave="resetGaze"
  >
    <Transition name="message">
      <div v-if="message" class="companion-message" role="status">
        <span class="message-name">晚音</span>
        <span>{{ message }}</span>
      </div>
    </Transition>

    <button class="hide-button" type="button" aria-label="隐藏看板娘" @click="isHidden = true">×</button>

    <div
      class="portrait-stage"
      :style="{
        '--look-x': `${look.x}px`,
        '--look-y': `${look.y}px`,
        '--head-turn': `${look.x * 0.15}deg`,
      }"
    >
      <img
        class="portrait-base"
        src="/mascot/companion.webp"
        alt="长发、玫瑰色开衫的成年动漫看板娘晚音"
        draggable="false"
      />

      <!-- 同一立绘的局部副本，只在头部范围内产生轻微视差。 -->
      <div class="head-window" aria-hidden="true">
        <img class="portrait-head" src="/mascot/companion.webp" alt="" draggable="false" />
      </div>

      <div class="gaze-highlight gaze-left" aria-hidden="true"></div>
      <div class="gaze-highlight gaze-right" aria-hidden="true"></div>

      <!-- SVG 与 1122 × 1402 原图共用坐标，缩放后热区仍准确。 -->
      <svg class="hit-map" viewBox="0 0 1122 1402" aria-label="角色互动区域" @click="handleZoneClick">
        <path class="hit-zone" data-zone="body" aria-label="躯体" d="M245 500C310 430 805 430 875 515L940 1402H180Z" />
        <ellipse class="hit-zone" data-zone="chest" aria-label="胸前衣服" cx="560" cy="760" rx="175" ry="205" />
        <path class="hit-zone" data-zone="leftArm" aria-label="左手臂" d="M235 610C270 570 355 600 405 735L505 1275C455 1345 355 1320 320 1220L235 850Z" />
        <path class="hit-zone" data-zone="rightArm" aria-label="右手臂" d="M880 610C835 570 760 600 710 735L615 1275C660 1345 760 1320 805 1220L890 850Z" />
        <ellipse class="hit-zone" data-zone="head" aria-label="头部" cx="560" cy="320" rx="235" ry="280" />
        <ellipse class="hit-zone" data-zone="leftEar" aria-label="左耳" cx="448" cy="330" rx="34" ry="60" />
        <ellipse class="hit-zone" data-zone="rightEar" aria-label="右耳" cx="699" cy="324" rx="35" ry="62" />
        <ellipse class="hit-zone" data-zone="eyes" aria-label="眼睛" cx="568" cy="300" rx="125" ry="45" />
        <ellipse class="hit-zone" data-zone="mouth" aria-label="嘴巴" cx="565" cy="390" rx="64" ry="34" />
      </svg>
    </div>
  </aside>

  <button v-else class="restore-button" type="button" @click="restore">晚音</button>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const stageRef = ref(null)
const isHidden = ref(false)
const activeZone = ref('')
const message = ref('今晚想听什么故事？')
const look = reactive({ x: 0, y: 0 })

const messages = {
  head: ['头发可不能揉乱呀。', '是在确认我有没有认真听吗？'],
  eyes: ['我一直有看着你。', '离这么近，我会不好意思的。'],
  mouth: ['想让我说些什么？', '哼一小段旋律也可以。'],
  leftEar: ['这里有一点痒……', '我听见你啦。'],
  rightEar: ['悄悄话要说轻一点。', '这边也听得很清楚。'],
  leftArm: ['要击掌吗？', '今天也一起加油。'],
  rightArm: ['轻轻碰一下就好。', '需要我帮忙吗？'],
  chest: ['请注意分寸。', '这里不可以随便碰。'],
  body: ['我在这里陪着你。', '找到喜欢的故事了吗？'],
}

let messageTimer
let lastZone = ''
let repeatedCount = 0

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function updateGaze(clientX, clientY) {
  const rect = stageRef.value?.getBoundingClientRect()
  if (!rect) return

  const centerX = rect.left + rect.width * 0.52
  const centerY = rect.top + rect.height * 0.28
  const dx = clientX - centerX
  const dy = clientY - centerY
  const distance = Math.hypot(dx, dy)

  if (distance > 520) {
    resetGaze()
    return
  }

  look.x = clamp(dx / 42, -5, 5)
  look.y = clamp(dy / 55, -3.5, 3.5)
}

function handleLocalPointer(event) {
  updateGaze(event.clientX, event.clientY)
}

function resetGaze() {
  look.x = 0
  look.y = 0
}

function handleWindowPointer(event) {
  updateGaze(event.clientX, event.clientY)
}

function reactToZone(zone) {
  if (!messages[zone]) return

  repeatedCount = lastZone === zone ? repeatedCount + 1 : 1
  lastZone = zone
  activeZone.value = zone

  if (zone === 'chest' && repeatedCount >= 3) {
    message.value = '我已经说过不可以了。'
  } else {
    const options = messages[zone]
    message.value = options[(repeatedCount - 1) % options.length]
  }

  window.clearTimeout(messageTimer)
  messageTimer = window.setTimeout(() => {
    activeZone.value = ''
    message.value = ''
  }, 2400)
}

function handleZoneClick(event) {
  const zone = event.target.closest('[data-zone]')?.dataset.zone
  if (zone) reactToZone(zone)
}

function restore() {
  isHidden.value = false
  message.value = '我回来啦。'
}

onMounted(() => {
  window.addEventListener('pointermove', handleWindowPointer, { passive: true })
  messageTimer = window.setTimeout(() => { message.value = '' }, 3200)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handleWindowPointer)
  window.clearTimeout(messageTimer)
})
</script>

<style scoped>
.portrait-companion {
  position: fixed;
  right: clamp(8px, 2vw, 28px);
  bottom: 0;
  z-index: 45;
  width: clamp(220px, 23vw, 330px);
  height: min(76vh, 620px);
  pointer-events: none;
  filter: drop-shadow(0 16px 24px rgb(24 35 58 / 0.18));
}

.portrait-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: auto;
  transform-origin: 50% 100%;
  animation: breathe 5.4s ease-in-out infinite;
}

.portrait-base,
.portrait-head {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  user-select: none;
}

.head-window {
  position: absolute;
  inset: 0;
  clip-path: ellipse(29% 28% at 50% 24%);
  pointer-events: none;
}

.portrait-head {
  transform: translate(calc(var(--look-x) * 0.42), calc(var(--look-y) * 0.32)) rotate(var(--head-turn));
  transform-origin: 50% 29%;
  transition: transform 140ms ease-out;
}

.gaze-highlight {
  position: absolute;
  top: 21.2%;
  width: 4px;
  height: 5px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.82);
  box-shadow: 0 0 3px rgb(255 255 255 / 0.7);
  transform: translate(var(--look-x), var(--look-y));
  transition: transform 90ms ease-out;
  pointer-events: none;
}

.gaze-left { left: 44.2%; }
.gaze-right { left: 55.7%; }

.hit-map {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.hit-zone {
  fill: transparent;
  stroke: transparent;
  stroke-width: 12;
  cursor: pointer;
  pointer-events: all;
}

.companion-message {
  position: absolute;
  z-index: 3;
  top: 8%;
  right: 86%;
  width: max-content;
  max-width: min(250px, 52vw);
  padding: 12px 15px;
  border: 1px solid rgb(255 255 255 / 0.9);
  border-radius: 16px 16px 4px 16px;
  background: rgb(255 255 255 / 0.88);
  box-shadow: 0 10px 28px rgb(36 45 72 / 0.14);
  color: #3c4358;
  font-size: 13px;
  line-height: 1.55;
  pointer-events: auto;
  backdrop-filter: blur(14px);
}

.message-name {
  display: block;
  margin-bottom: 2px;
  color: #b55f75;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.hide-button {
  position: absolute;
  z-index: 5;
  top: 5%;
  right: 2%;
  width: 28px;
  height: 28px;
  border: 1px solid rgb(255 255 255 / 0.8);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.65);
  color: #697084;
  cursor: pointer;
  pointer-events: auto;
  opacity: 0;
  transition: opacity 180ms ease, background 180ms ease;
}

.portrait-companion:hover .hide-button,
.hide-button:focus-visible { opacity: 1; }
.hide-button:hover { background: white; }

.restore-button {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 45;
  padding: 8px 13px;
  border: 1px solid #e8cad2;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.9);
  box-shadow: 0 8px 22px rgb(36 45 72 / 0.12);
  color: #a75168;
  cursor: pointer;
}

.is-reacting .portrait-stage { animation: react 420ms ease both; }
.is-shy .portrait-base,
.is-shy .portrait-head { filter: saturate(0.92) sepia(0.04); }

.message-enter-active,
.message-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.message-enter-from,
.message-leave-to { opacity: 0; transform: translate(8px, 6px) scale(0.96); }

@keyframes breathe {
  0%, 100% { transform: translateY(0) scaleY(1); }
  50% { transform: translateY(1px) scaleY(1.006); }
}

@keyframes react {
  0%, 100% { transform: translateY(0) rotate(0); }
  38% { transform: translateY(5px) rotate(-0.8deg); }
  68% { transform: translateY(-2px) rotate(0.5deg); }
}

@media (max-width: 760px) {
  .portrait-companion {
    right: -24px;
    width: 220px;
    height: 410px;
  }
  .companion-message { right: 72%; top: 6%; }
  .gaze-highlight { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .portrait-stage { animation: none; }
  .portrait-head,
  .gaze-highlight { transition: none; }
}
</style>
