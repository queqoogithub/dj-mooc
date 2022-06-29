instruction: 
1. ให้ติดตั้ง stripe cli ([download](https://github.com/stripe/stripe-cli/releases/tag/v1.8.8), [docs](https://stripe.com/docs/stripe-cli))
2. เมื่อใช้งานให้รัน stripe cli 
    login
    * $ stripe login --api-key STRIPE_APIKEY 
    * จากนั้นให้ enter หรือ copy access link เพื่อ allow access
    forward webhook
    * $ stripe listen --forward-to localhost:8000/payment/webhook/

## Todo ... teacher สามารถกำหนด
1. updatable_content_time เช่น เมื่อครบเวลา 1 ปี course นั้นจะไม่มีการอัพเดทเนื้อหา
2. special / update content สามารถคิดเงินเพิ่มเติมได้

## Painpoint
1. การฝากไฟล์บน Cloud เป็น Fix cost หากไม่สามารถขาย course เพิ่มได้ ต้นทุน / หน่วย จะสูงขึ้น จนอาจขาดทุนได้ในอนาคต
2.  
