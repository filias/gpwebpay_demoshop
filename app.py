import base64
import random
import string
import os

from flask import (
    Flask,
    request,
    render_template,
    jsonify,
    make_response,
    json,
)

from gpwebpay import GpwebpayClient, InvalidSignatureError, InvalidCallbackError


app = Flask(__name__)

client = GpwebpayClient(
    merchant_id=os.environ.get("GPWEBPAY_MERCHANT_ID", ""),
    private_key=base64.b64decode(os.environ.get("GPWEBPAY_MERCHANT_PRIVATE_KEY", "")),
    private_key_password=os.environ.get("GPWEBPAY_MERCHANT_PRIVATE_KEY_PASSPHRASE"),
    gateway_public_key=base64.b64decode(os.environ.get("GPWEBPAY_PUBLIC_KEY", "")),
    callback_url=os.environ.get(
        "GPWEBPAY_CALLBACK_URL", "https://localhost:5000/payment_callback"
    ),
)


@app.route("/")
def index():
    # dummy data
    filename = os.path.join(app.static_folder, "data", "products.json")
    with open(filename) as products_file:
        products = json.load(products_file)
    return render_template("index.html", products=products)


@app.route("/pay", methods=["GET", "POST"])
def request_payment():
    order_number = "".join(random.choices(string.digits, k=6))
    amount = 0
    if request.method == "POST":
        amount = int(float(request.json * 100))

    response = client.request_payment(order_number=order_number, amount=amount)

    return make_response(jsonify({"url": str(response.url)}), response.status_code)


@app.route("/payment_callback")
def payment_callback():
    try:
        result = client.parse_callback(request.url)
        if result.get("PRCODE") == "0":
            return "Your order is paid!"
        return f"Payment failed (PRCODE: {result.get('PRCODE')})"
    except (InvalidSignatureError, InvalidCallbackError):
        return "Payment verification failed", 400


if __name__ == "__main__":
    app.run(ssl_context="adhoc")  # To use https
