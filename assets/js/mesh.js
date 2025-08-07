// Mesh background script

// Config
const NODE_DISTANCE = 50;
const NODE_COUNT_X = (window.innerWidth + NODE_DISTANCE) * (1/NODE_DISTANCE)
const NODE_COUNT_Y = (window.innerHeight + NODE_DISTANCE) * (1/NODE_DISTANCE)
const ALPHA = 0.5;
const EDGE_DISTANCE = 50;
const MOUSE_RADIUS = 200;
const canvas = document.getElementById('mesh-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let nodes = [];
let mouse = { x: null, y: null };

// Resize canvas
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Generate nodes
function initNodes() {
  nodes = [];
  for (let i = 0; i <= NODE_COUNT_X; i++) {
    for (let j = 0; j <= NODE_COUNT_Y; j++) {
        nodes.push({
            x: i*NODE_DISTANCE,
            y: j*NODE_DISTANCE,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        });
    }
  }
}
initNodes();

// Mouse tracking
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw edges and nodes
  for (let i = 0; i < nodes.length; i++) {
    let nodeA = nodes[i];

    // Draw node
    ctx.beginPath();
    ctx.arc(nodeA.x, nodeA.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(100, 170, 110,${ALPHA})`;
    
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      let nodeB = nodes[j];
      let dx = nodeA.x - nodeB.x;
      let dy = nodeA.y - nodeB.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= EDGE_DISTANCE) {
        // Deform if near mouse
        let mx = (nodeA.x + nodeB.x) / 2;
        let my = (nodeA.y + nodeB.y) / 2;
        let mdx = mouse.x - mx;
        let mdy = mouse.y - my;
        let mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        let offsetX = 0;
        let offsetY = 0;

        if (mdist <= MOUSE_RADIUS) {
          const force = (1 - mdist / MOUSE_RADIUS) * 10;
          offsetX = (Math.random() - 0.5) * force;
          offsetY = (Math.random() - 0.5) * force;
        }

        ctx.beginPath();
        ctx.moveTo(nodeA.x + offsetX, nodeA.y + offsetY);
        ctx.lineTo(nodeB.x + offsetX, nodeB.y + offsetY);
        ctx.strokeStyle = `rgba(100, 170, 110, ${ALPHA})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
