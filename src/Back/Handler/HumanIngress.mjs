// @ts-check

/**
 * @namespace Alarisa_Pwa_Back_Handler_HumanIngress
 * @description TeqFW PROCESS handler that validates a PWA Principal contribution and delegates it to host ingress.
 */

const ROUTE = '/api/ingress/human';
const MAX_BODY_BYTES = 8192;
const MAX_TEXT_LENGTH = 4000;

/**
 * @param {import('node:http').IncomingMessage} request
 * @returns {Promise<string>}
 */
async function readBody(request) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];
        request.on('data', (chunk) => {
            size += chunk.length;
            if (size > MAX_BODY_BYTES) {
                reject(new Error('Request body is too large'));
                request.destroy();
                return;
            }
            chunks.push(chunk);
        });
        request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        request.on('error', reject);
    });
}

/**
 * @param {import('node:http').ServerResponse} response
 * @param {number} status
 * @param {object} body
 * @returns {void}
 */
function respondJson(response, status, body) {
    response.writeHead(status, {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'});
    response.end(JSON.stringify(body));
}

export default class Alarisa_Pwa_Back_Handler_HumanIngress {
    /**
     * @param {object} deps
     * @param {Fl32_Web_Back_Dto_Info__Factory$} deps.dtoInfoFactory
     * @param {Fl32_Web_Back_Enum_Stage$} deps.STAGE
     * @param {{accept: (input: {text: string, channel: string}) => Promise<unknown>}} deps.ingress
     */
    constructor({dtoInfoFactory, STAGE, ingress}) {
        const info = dtoInfoFactory.create({
            name: 'Alarisa_Pwa_Back_Handler_HumanIngress',
            stage: STAGE.PROCESS,
        });

        this.getRegistrationInfo = function () {
            return info;
        };

        this.handle = async function (context) {
            const {request, response} = context;
            if (request.method !== 'POST' || new URL(request.url ?? '/', 'http://localhost').pathname !== ROUTE) return;

            const contentType = request.headers['content-type'] ?? '';
            if (!contentType.toLowerCase().startsWith('application/json')) {
                respondJson(response, 415, {accepted: false, error: 'Content-Type must be application/json'});
                context.completed = true;
                return;
            }

            let payload;
            try {
                payload = JSON.parse(await readBody(request));
            } catch (error) {
                respondJson(response, 400, {accepted: false, error: error instanceof Error ? error.message : 'Invalid JSON'});
                context.completed = true;
                return;
            }
            const text = typeof payload?.text === 'string' ? payload.text.trim() : '';
            if (!text || text.length > MAX_TEXT_LENGTH) {
                respondJson(response, 400, {accepted: false, error: `text must contain 1 to ${MAX_TEXT_LENGTH} characters`});
                context.completed = true;
                return;
            }

            try {
                await ingress.accept({text, channel: 'pwa'});
                respondJson(response, 202, {accepted: true});
            } catch {
                respondJson(response, 503, {accepted: false, error: 'Ingress is unavailable'});
            }
            context.completed = true;
        };
    }
}

export const __deps__ = Object.freeze({
    dtoInfoFactory: 'Fl32_Web_Back_Dto_Info__Factory$',
    STAGE: 'Fl32_Web_Back_Enum_Stage$',
    ingress: 'Alarisa_Back_Ingress_Human$',
});
