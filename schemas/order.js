export default{
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'productID',
        title: 'Product ID',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'orderName',
        title: 'Order Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'shippingDate',
        title: 'Shipping Date',
        type: 'datetime'
      },
      {
        name: 'shippingAddress',
        title: 'Shipping Address',
        type: 'string'
      },
      {
        name: 'orderTime',
        title: 'Order Time',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'total',
        title: 'Total Amount',
        type: 'number',
        validation: Rule => Rule.required().integer()
      }
    ]
  }
  