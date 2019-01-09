class db {
  static products = [
    {
      id: 1,
      name: 'BB8 Star Wars Ep VII',
      price: 10,
      imageURL: 'https://i.ebayimg.com/images/g/pJoAAOSwx~JWE2t0/s-l300.jpg',
      description: "This is a cool product tho'",
      categories: ['toy', 'bb8', 'star-wars']
    },
    {
      id: 2,
      name: 'R2-D2 - Star Wars Ep III',
      price: 50,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/I/71TlUPU8ZhL._SY355_.jpg',
      description:
        'R2-D2, pronounced Artoo-Detoo and often referred to as Artoo, was an R2 series astromech droid manufactured by Industrial Automaton with masculine programming.',
      categories: ['star-wars', 'r2-d2']
    },
    {
      id: 3,
      name: 'C-3PO - Star Wars Ep II',
      price: 35,
      imageURL: 'https://images-na.ssl-images-amazon.com/images/I/41zeo9UNcTL._SY300_.jpg',
      description:
        'C-3PO, sometimes spelled See-Threepio and often referred to simply as Threepio, was a 3PO unit protocol droid designed to interact with organics, programmed primarily for etiquette and protocol',
      categories: ['droid']
    },
    {
      id: 4,
      name: 'Astromech droid',
      price: 80,
      imageURL:
        'https://vignette.wikia.nocookie.net/starwars/images/b/b8/R2-KT_meeting.png/revision/latest/scale-to-width-down/250?cb=20121008235559',
      description:
        'An astromech droid, also referred to as an astro droid or mech, was a type of repair droid that served as an automated mechanic on starships.',
      categories: ['toy', 'droid']
    }
  ]

  static getProducts() {
    return this.products
  }

  static queryProducts(query) {
    const normalizedQuery = query.toLowerCase()
    if (query.length === 0) {
      return this.products
    } else {
      return this.products.filter(product => {
        return (
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.categories.includes(normalizedQuery)
        )
      })
    }
  }

  static queryCategories(query) {
    const normalizedQuery = query.toLowerCase()
    if (query.length === 0) {
      return this.products
    } else {
      return this.products.filter(product => {
        return product.categories.includes(normalizedQuery)
      })
    }
  }

  static queryPriceRange(query) {
    return this.products.filter(product => {
      return product.price >= query.minValue && product.price <= query.maxValue
    })
  }

  static getCategories() {
    var categoryList = []
    this.products.map((product, index) => {
      product.categories.map((category, indexCategory) => {
        if (!categoryList.includes(category)) categoryList.push(category)
      })
    })
    return categoryList
  }

  static getPriceRange() {
    var minValue = 0
    var maxValue = 0
    this.products.map((product, index) => {
      if (product.price < minValue) minValue = product.price
      if (product.price > maxValue) maxValue = product.price
    })

    var priceRangeList = []
    const maxButtons = 4
    var rate = Math.round((maxValue - minValue) / maxButtons)
    for (var i = 1; i <= maxButtons; i++) {
      priceRangeList.push({
        label: 'U$' + rate * (i - 1) + ' to U$' + rate * i,
        minValue: rate * (i - 1),
        maxValue: rate * i
      })
    }
    priceRangeList.push({
      label: 'U$' + minValue + ' to U$' + maxValue,
      minValue: minValue,
      maxValue: maxValue
    })
    return priceRangeList
  }
}

export default db
