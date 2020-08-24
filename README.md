# gpwebpay_demoshop

Demoshop demonstrates the usage of [gpwebpay package](https://github.com/vintesk/gpwebpay) with Flask and React.js.
The communication between Javascript and Flask happens with Fetch API.
You need to have Python3 and npm installed.

![usage](usage.png)

## To run it locally:

To run the backend of the application first create, activate and install requirements on a virtualenv:
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

You need to have the environmental variables needed by the gpwebpay package in order for the payment to go through. 
Check the [documentation](https://github.com/filias/gpwebpay) 

Then run Flask:

```bash
python app.py
```

---

To run the frontend of the application:

```bash
cd /app
npm i
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
