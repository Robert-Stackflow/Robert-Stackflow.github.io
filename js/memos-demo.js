const RANDOM_MEMO_SETTINGS = {
  // Amount of memos to cache
  memoAmount: 100,
  // Kinds of memos to cache: PUBLIC = visible to everyone, PROTECTED = logged in users, PRIVATE = only the creator
  memoKinds: ["PUBLIC", "PROTECTED", "PRIVATE"],
  // Time in minutes to cache the memos
  memoCacheTimeMinutes: 60,
  // Username of the memo creator to filter the memos
  memoCreatorUsername: "",
  // Button text
  buttonText: "Random",
  // Button tooltip
  buttonTooltip: "Show a random memo",
  // Local storage key to store the memo uids
  cacheKey: "randomMemoUuidCache",
  // Local storage key to store the last update timestamp
  cacheLastUpdateKey: "randomMemoUuidCacheLastUpdate",
};

async function cacheMemosUuids(settings) {
  const lastUpdate = localStorage.getItem(settings.cacheLastUpdateKey);
  const cacheTimeMillis = (settings.memoCacheTimeMinutes || 60) * 60 * 1000;
  const mustUpdate =
    lastUpdate === null || Date.now() - lastUpdate > cacheTimeMillis;

  if (localStorage.getItem(settings.cacheKey) !== null && !mustUpdate) {
    return;
  }

  const memoKinds = settings.memoKinds || ["PUBLIC", "PROTECTED", "PRIVATE"];
  let filters = [
    `row_status == "NORMAL"`,
    `visibilities == ${JSON.stringify(memoKinds)}`,
  ];
  if (settings.memoCreatorUsername) {
    filters.push(`creator == "users/${settings.memoCreatorUsername}"`);
  }

  const memoAmount = settings.memoAmount || 100;
  let apiEndpoint =
    window.location.origin +
    "/api/v2/memos" +
    `?pageSize=${memoAmount}` +
    "&filter=" +
    encodeURIComponent(filters.join(" && "));

  await fetch(apiEndpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (json.memos.length === 0) {
        return;
      }
      let memoUuids = [];
      for (let i = 0; i < json.memos.length; i++) {
        memoUuids.push(json.memos[i].uid);
      }
      localStorage.setItem(settings.cacheKey, JSON.stringify(memoUuids));
      localStorage.setItem(settings.cacheLastUpdateKey, Date.now());
    })
    .catch(function (error) {
      throw new Error("Error fetching memos: " + error);
    });
}

async function updateRandomMemoLink(settings) {
  const storedUuids = localStorage.getItem(settings.cacheKey);
  if (storedUuids === null) {
    cacheMemosUuids();
    return null;
  }

  const memoUuidCache = JSON.parse(storedUuids);
  const randomIndex = Math.floor(Math.random() * memoUuidCache.length);
  const randomMemoUid = memoUuidCache[randomIndex];
  const randomMemoButton = document.getElementById("header-random");
  if (randomMemoButton === null) {
    return;
  }
  randomMemoButton.href = "/m/" + randomMemoUid;
}

async function insertRandomMemoButton(settings) {
  if (document.getElementById("header-random") !== null) {
    return;
  }

  let insertionTries = 0;
  while (
    document.getElementById("header-setting") === null &&
    insertionTries < 20
  ) {
    await new Promise((r) => setTimeout(r, 100));
    insertionTries++;
  }

  const headerSetting = document.getElementById("header-setting");
  if (headerSetting === null) {
    return;
  }
  headerSetting.insertAdjacentHTML(
    "afterend",
    `<a id="header-random"
          class="px-2 py-2 rounded-2xl border flex flex-row items-center text-lg text-gray-800 dark:text-gray-400 hover:bg-white hover:border-gray-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 w-full px-4 border-transparent"
          href="/" title="${settings.buttonTooltip}">
          <div aria-label="Random" class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dices w-6 h-auto opacity-70"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>
          </div>
          <span class="ml-3 truncate">${settings.buttonText}</span>
      </a>`
  );

  const headerRandom = document.getElementById("header-random");
  if (headerRandom === null) {
    return;
  }
  headerRandom.onclick = async () => {
    await updateRandomMemoLink();
  };
  headerRandom.onauxclick = async () => {
    await updateRandomMemoLink();
  };
}

(async () => {
  try {
    await cacheMemosUuids(RANDOM_MEMO_SETTINGS);
    await insertRandomMemoButton(RANDOM_MEMO_SETTINGS);
    await updateRandomMemoLink(RANDOM_MEMO_SETTINGS);
  } catch (e) {
    console.error(e);
  }
})();
