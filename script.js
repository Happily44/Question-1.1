function openInGoogleMapsApp() {
    const placeID = "ChIJBWueYZaPQTURzBI1Tcb36Uw"; // Place IDを設定
    const googleMapsAppURL = `comgooglemaps://?q=place_id:${placeID}`; // Googleマップアプリ用スキーム
    const googleMapsReviewURL = `https://search.google.com/local/writereview?placeid=${placeID}`; // Web版レビュー投稿URL

    // Googleマップアプリ専用のスキームで口コミページを開く
    window.location.href = googleMapsAppURL;

    // アプリがインストールされていない場合にWeb版にフォールバック
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
            setTimeout(openInGoogleMapsApp, 3000); // 3秒後にGoogleマップを開く
        } else {
            // それ以外の評価ではコメント入力画面に遷移
            window.location.href = "feedback-form.html"; // コメントページのURL
        }
    } else {
        alert('評価を選択してください。');
    }
}
