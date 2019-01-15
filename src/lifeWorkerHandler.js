// @flow

export let cells: Array<CellType> = [];

let lifeWorker: ?ServiceWorkerContainer = null;

export const initLifeWorkerHandler = (numberOfColumns: number, numberOfRows: number) => {
    if (!('serviceWorker' in navigator)) return;

    lifeWorker = navigator.serviceWorker;

    if (lifeWorker instanceof ServiceWorkerContainer) {
        lifeWorker.register('lifeWorker.js', { scope: '/' }).then(function(registration) {
            console.log('[PAGE] Service Worker Registered');
        });

        lifeWorker.ready.then(function(registration) {
            console.log('[PAGE] Service Worker Ready');

            sendMessage({
                task: 'createCells',
                numberOfColumns: numberOfColumns,
                numberOfRows: numberOfRows
            }).then(function(response) {
                console.log('[PAGE] Cells created', response);
                if (response && response.cells) {
                    cells = response.cells;
                }

                setInterval(() => {
                    sendMessage({
                        task: 'getCells'
                    }).then(function(response) {
                        console.log('[PAGE] Got cell updates', response);
                        if (response && response.cells) {
                            cells = response.cells;
                        }
                    });
                }, 1000);
            });
        });

        lifeWorker.addEventListener('message', function(e) {
            console.log('[PAGE] Recieved message from lifeWorker', e);
        });
    }
};

const sendMessage = message => {
    return new Promise(function(resolve, reject) {
        if (lifeWorker instanceof ServiceWorkerContainer) {
            let messageChannel = new MessageChannel();
            let incomingPort: MessagePort = messageChannel.port1;
            let outgoingPort: MessagePort = messageChannel.port2;
            let outgoingPortArray: Array<MessagePort> = [outgoingPort];

            if (lifeWorker.controller instanceof ServiceWorker) {
                lifeWorker.controller.postMessage(message, outgoingPortArray);
            }

            incomingPort.onmessage = e => {
                if (e.data && e.data.error) {
                    reject(e.data.error);
                } else {
                    resolve(e.data);
                }
            };
        }
    });
};

type CellType = {
    row: number,
    column: number,
    alive: boolean,
    willBeAlive: boolean,
    neighbors: number
};

type CellTypeArray = Array<CellType>;
