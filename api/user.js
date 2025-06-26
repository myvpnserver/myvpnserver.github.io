//users.js
import { shortBaseUrl } from "./config";
import { getStorage } from "../utils/storage";
import { getAuthToken } from "./auth";

export async function getUserInfo() { 
    try {
        const { token } = await getStorage(['token']);
        if (!token) {
            await getAuthToken();
            return { success: false, error: 'Токен не найден' };
        }
        const browserLang = navigator.language.split('-')[0];
        const locale = ['ru', 'en'].includes(browserLang) ? browserLang : 'ru';

        const res = await fetch(shortBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: '/api/balance/getAndroid',
                token,
                locale
            })
        });

        const data = await res.json();
        if (data) {
             console.log('Ответ от api/balance/getAndroid:', data);
            return { success: true, userInfo: data };
        } else {
            return { success: false, error: 'Некорректный ответ сервера' };
        }
    } catch (e) {
        return { success: false, error: e.message };
    }
}

export async function getSubscriptionInfo() {
    try {
        const { token } = await getStorage(['token']);
        if (!token) {
            await getAuthToken();
            return { success: false, error: 'Токен не найден' };
        }

        const res = await fetch(shortBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: '/api/subscription/get', token })
        });
        const data = await res.json();
        console.log('Ответ от api/subscription/get:', data);
        if (data) {
            return { res: data.res, subscription: data.subscription, error: data.error }
        } else {
            return { res: 0, error: "Некорректный формат ответа" }
        }
    } catch (e) {
        console.error('Ошибка при /api/subscription/get:', e);
        return { res: 0, error: e.message }
    }
}

export async function getTariffs() {
    try {
        const { token } = await getStorage(['token']);
        if (!token) {
            getAuthToken();
            return { success: false, error: 'Токен не найден' };
        }

        const res = await fetch(shortBaseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: '/api/price/get', token })
        });

        const data = await res.json();
        console.log('Ответ от api/price/get', data);

        if (data) {
            return { success: true, plans: data };
        } else {
            return { success: false, error: 'Некорректный формат ответа' };
        }
    } catch (e) {
        console.error('Ошибка при api/price/get:', e);
        return { success: false, error: e.message };
    }
}

export async function cancelSubscription(cp_id, subscriptionsId) {
  //const formattedOrderId = parseInt(subscriptionsId, 10);
  try {
        const { token } = await getStorage(['token']);
        if (!token) {
            getAuthToken();
            return { success: false, error: 'Токен не найден' };
        }

    const res = await fetch(shortBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: '/api/subscription/cancel',
        token,
        cp_id,
        subscriptionsId
      })
    });
    const data = await res.json();
    console.log('Ответ от api/subscription/cancel:', data);

    if (data.res === 1) {
      return({
        res: data.res,
      });
    } else {
      return({ res: 0, error: 'Некорректный формат ответа' });
    }
  } catch (e) {
    console.error('Ошибка при /api/subscription/cancel:', e);
    return({ res: 0, error: e.message });
  }
}
