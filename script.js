function openInGoogleMapsApp() {
    const placeID = "ChIJBWueYZaPQTURzBI1Tcb36Uw"; // Place IDを設定
    const googleMapsAppURL = `comgooglemaps://?daddr=place_id:${placeID}`; // Googleマップアプリ用スキーム
    const googleMapsReviewURL = `https://search.google.com/local/writereview?placeid=${placeID}`; // Web版の口コミ投稿URL

    // Googleマップアプリ専用のスキームで場所を開く
    window.location.href = googleMapsAppURL;

    // アプリがインストールされていない場合にWeb版の口コミ投稿ページにフォールバック
    setTimeout(() => {
        window.location.href = googleMapsReviewURL;
    }, 500);
}

function handleNext() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');

    if (selectedRating) {
        const selectedRatingValue = selectedRating.value;
        const ratingText = selectedRating.parentElement.textContent.trim();

        // 評価をローカルストレージに保存
        localStorage.setItem('selectedRatingText', ratingText);

        // アンケートセクションを非表示
        document.getElementById('surveySection').style.display = 'none';

        if (selectedRatingValue === "5" || selectedRatingValue === "4") {
            // 満足以上の場合はGoogleマップ案内画面に遷移
            document.getElementById('googleMapSection').style.display = 'block';

            // GoogleマップアプリまたはWeb版口コミ投稿ページに移動
            openInGoogleMapsApp(); // 即座にGoogleマップを開く
        } else {
            // それ以外の評価ではコメント入力画面に遷移
            window.location.href = "feedback-form.html"; // コメントページのURL
        }
    } else {
        alert('評価を選択してください。');
    }
}

