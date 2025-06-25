import { shortBaseUrl } from './config.js';
import { getStorage } from '../utils/storage.js';


export async function getPaymentUrl(subscriptionType) {
  //subscriptionType = 12;
  try {
    const { token } = await getStorage(['token']);
    if (!token) return ({ success: false, error: 'Токен не найден' });
    console.log('getPaymentUrl: Initiating payment request', { token });

    const requestBody = {
      path: '/api/cloudpayments/bind',
      token,
      deviceType: 'chrome',
      subscriptionType: subscriptionType
    };

    console.log('Sending request with body (stringified):', JSON.stringify(requestBody, null, 2));

    console.log('Request Body Details:');
    console.log('Path:', requestBody.path);
    console.log('Token:', requestBody.token);
    console.log('Device Type:', requestBody.deviceType);
    console.log('Subscription Type:', requestBody.subscriptionType);
    const res = await fetch(shortBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    console.log('getPaymentUrl: Payment URL received', { paymentUrl: data.PaymentURL });
    console.log('Full response data:', data); // Логирование полного ответа

    return ({
      success: data.Success,
      paymentUrl: data.PaymentURL,
      order_id: data.order_id
    });
  } catch (error) {
    console.error('getPaymentUrl: Error', error);
    return ({ success: false });
  }
}

export async function getStripePaymentUrl() {
    try {
      const { token } = await getStorage(['token']);
      if (!token) {
        console.error('getStripePaymentUrl: Token not found');
        return { success: false, error: 'Токен не найден' };
      }
      console.log('getStripePaymentUrl: Initiating Stripe payment', { token });
      const res = await fetch(shortBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: '/api/stripe/new',
          token,
          amount: 5,
          'deviceType': 'chrome',
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('getStripePaymentUrl: HTTP error', { status: res.status, text });
        return ({ success: false, error: `HTTP ${res.status}: ${text}` });
      }
      const data = await res.json();
      console.log('getStripePaymentUrl: Stripe URL received', { url: data.url });
      console.log("Stripe orderID payment script: ", data.orderId)
      return ({
        success: true,
        url: data.url,
        orderId: data.orderId
      });
    } catch {
      console.error('getStripePaymentUrl: Error');
      return ({ success: false });
    }
}

export async function checkStripePayment(orderId) {
  try {
    const { token } = await getStorage(['token']);
    if (!token) {
      console.error('checkStripePayment: Token not found', { orderId });
      return { success: false, error: 'Токен не найден' };
    }

    console.log('checkStripePayment: Checking payment status', { orderId });
    const res = await fetch(shortBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: '/api/stripe/get',
        token,
        orderId,
        deviceType: 'chrome',
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('checkStripePayment: HTTP error', { orderId, status: res.status, text });
      return { success: false, error: `HTTP ${res.status}: ${text}` };
    }

    const data = await res.json();
    console.log('checkStripePayment: Payment status received', { orderId, order: data.order });

    return {
      success: true,
      order: data.order,
    };
  } catch (e) {
    console.error('checkStripePayment: Error', { orderId, error: e.message });
    return { success: false, error: e.message };
  }
}


export async function checkCloudPayment(order_id) {
  console.log('checkCloudPayment: Called')
  try {
    const { token } = await getStorage(['token']);
    if (!token) {
      console.error('checkCloudPayment: Token not found', { order_id });
      return { success: false, error: 'Токен не найден' };
    }

    console.log('checkCloudPayment: Checking payment status', { order_id, token });
    const res = await fetch(shortBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: '/api/cloudpayments/status',
        token,
        order_id
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('checkCloudPayment: HTTP error', { order_id, status: res.status, text });
      return { success: false, error: `HTTP ${res.status}: ${text}` };
    }

    const data = await res.json();
    console.log('checkCloudPayment: Payment status received', { order_id, Status: data.Status });

    return {
      success: true,
      Status: data.Status,
    };
  } catch (e) {
    console.error('checkCloudPayment: Error', { order_id, error: e.message });
    return { success: false, error: e.message };
  }
}
// USDT(TRC20)

export async function getUsdtWallet() {
  try {
    const { token } = await getStorage(['token']);
    if (!token) {
      console.error('getStripePaymentUrl: Token not found');
      return ({ success: false, error: 'Токен не найден' });
    }
    console.log("USDT payment wallet get");
    const res = await fetch(shortBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: "/api/crypto/new",
        token,
        'deviceType': 'chrome'
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.log('getUSDTWallet: HTTP: error', { status: res.status, text });
      return ({ success: false, error: `HTTP ${res.status}: ${text}` });
    }
    const data = await res.json();
    console.log("getUSDTWallet: trc20 wallet received", { trc20: data.trc20 });
    return({
      success: true,
      trc20: data.trc20,
      orderId: data.orderId
    });
  } catch (e) {
    console.error("getUSDTWallet: Error ", { error: e.message });
    return({ success: false, error: e.message });
  }
}

export async function checkUsdtPayment(orderId) {
  try {
    const { token } = await getStorage(['token']);
    if (!token) {
      console.error('UsdtPayment: Token not found', { orderId });
      return { success: false, error: 'Токен не найден' };
    }

    console.log('UsdtPayment: Checking payment status', { orderId, token });

    const res = await fetch(shortBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: '/api/crypto/get',
        token,
        orderId
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('UsdtPayment: HTTP error', { orderId, status: res.status, text });
      return { success: false, error: `HTTP ${res.status}: ${text}` };
    }

    const data = await res.json();
    console.log('UsdtPayment: Payment status received', { orderId, status: data.status });

    return {
      success: true,
      status: data.status,
    };
  } catch (e) {
    console.error('UsdtPayment: Error', { orderId, error: e.message });
    return { success: false, error: e.message };
  }
}