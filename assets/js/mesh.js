// Mesh background script

// Config
// const NODE_COUNT = 500;
// const EDGE_DISTANCE = 100;
const MOUSE_RADIUS = 50;
const canvas = document.getElementById('mesh-canvas');
const ctx = canvas.getContext('2d');
const NODE_COUNT = (window.innerWidth * window.innerHeight) * .00065
const EDGE_DISTANCE = 150;
const ALPHA = 0.1;

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

// Generate random nodes
function initNodes() {
  nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    });
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

  // Update node positions
  nodes.forEach((node) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
  });

  // Draw edges and nodes
  for (let i = 0; i < nodes.length; i++) {
    let nodeA = nodes[i];

    // Draw node
    ctx.beginPath();
    ctx.arc(nodeA.x, nodeA.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${ALPHA})`;
    
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      let nodeB = nodes[j];
      let dx = nodeA.x - nodeB.x;
      let dy = nodeA.y - nodeB.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < EDGE_DISTANCE) {
        // Deform if near mouse
        let mx = (nodeA.x + nodeB.x) / 2;
        let my = (nodeA.y + nodeB.y) / 2;
        let mdx = mouse.x - mx;
        let mdy = mouse.y - my;
        let mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        let offsetX = 0;
        let offsetY = 0;

        if (mdist < MOUSE_RADIUS) {
          const force = (1 - mdist / MOUSE_RADIUS) * 6;
          offsetX = (Math.random() - 0.25) * force;
          offsetY = (Math.random() - 0.25) * force;
        }

        ctx.beginPath();
        ctx.moveTo(nodeA.x + offsetX, nodeA.y + offsetY);
        ctx.lineTo(nodeB.x + offsetX, nodeB.y + offsetY);
        ctx.strokeStyle = `rgba(200, 200, 200, ${ALPHA*(1 - dist / EDGE_DISTANCE)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();
