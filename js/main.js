const wsUrl = 'wss://sdex-alb-664814673.ap-southeast-2.elb.amazonaws.com/ws';
const ws = new WebSocket(wsUrl);

ws.onopen = () => {
    console.log('Connected to WebSocket');
    document.getElementById('status').textContent = 'Connected to WebSocket';
    ws.send(JSON.stringify({type:'subscribe',channel:'orders'}));
};

ws.onmessage = (event) => {
    console.log('Received:', event.data);
    const data = JSON.parse(event.data);
    if (data.type === 'orderBook') {
        document.getElementById('status').textContent = 'Order book received';
    }
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    document.getElementById('status').textContent = 'WebSocket error: ' + error;
};
