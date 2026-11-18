import { productCategories } from '../data/content'
import './Products.css'

export function Products() {
  return (
    <section className="products factory-bg factory-bg--dots" id="products">
      <div className="wrap products__layout">
        <header className="products__intro">
          <p className="eyebrow">Product lines</p>
          <h2 className="display">Families we qualify on the floor</h2>
          <p>
            Standards-backed coverage across machinery, lighting, medical, PV and
            energy storage categories.
          </p>
        </header>
        <div className="products__list">
          {productCategories.map((item) => (
            <article key={item.title} className="products__row">
              <span className="products__code">IEC {item.code}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
