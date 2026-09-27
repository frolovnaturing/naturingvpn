const CURRENT_UPSTREAM = 'https://vpn.natur-ing.com/sub/work';

const MIGRATION_TEXT =
  '⚠️ Подписка NaturIng перенесена на новый адрес. Нажмите синюю кнопку профиля, чтобы подключить новое соединение. Старая ссылка пока продолжает работать.';

exports.handler = async function () {
  try {
    const response = await fetch(CURRENT_UPSTREAM, {
      headers: {
        'User-Agent': 'Netlify-NaturIng-Sub-Proxy/2.0'
      }
    });

    if (!response.ok) throw new Error(`upstream ${response.status}`);

    const content = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Profile-Title': 'NaturIng VPN',
        'Profile-Update-Interval': '8',
        'Profile-Web-Page-Url': 'https://vpn.natur-ing.com/move',
        'Announce': 'base64:' + Buffer.from(MIGRATION_TEXT, 'utf8').toString('base64'),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      },
      body: content
    };
  } catch (e) {
    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      },
      body: 'Subscription temporarily unavailable'
    };
  }
};
