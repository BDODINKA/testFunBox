import React, { useState } from 'react'

import { PackType } from '../../../api/data'
import { generateClassNames } from '../../../utils/function/generateCSS'
import { giftCount } from '../../../utils/function/giftCount'

import style from './Card.module.scss'
import { NoticeCard } from './NoticeCard'

type PropsType = {
  card: PackType
}

export const Card = (props: PropsType) => {
  const { title, brand, filler, portion, description, gift, weight, count } = props.card

  const [selected, setSelected] = useState<boolean>(false)
  const [showTitle, setShowTitle] = useState<boolean>(false)

  const finalTitle = showTitle && selected ? 'Котэ не одобряет?' : title
  const finalGift = giftCount(gift)

  const onSelectedHandler = () => {
    if (count > 0) {
      setSelected(!selected)
    }
  }

  const onMouseFocusHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selected && event) {
      setShowTitle(true)
    } else {
      setShowTitle(false)
    }
  }

  const onMouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    selected && event && setShowTitle(false)
  }

  let styles: Record<string, string>

  if (selected) {
    styles = generateClassNames(style, selected, 'selected')
  } else {
    styles = generateClassNames(style, selected)
  }
  if (count < 1) {
    styles = generateClassNames(style, true, 'disabled')
  }

  return (
    <div
      className={styles.item}
      onClick={onSelectedHandler}
      onMouseEnter={onMouseFocusHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.content}>
            <p className={styles.title}>{finalTitle}</p>
            <h3 className={styles.brand}>{brand}</h3>
            <h5 className={styles.filler}>{filler}</h5>
            <p className={styles.portion}>{portion}</p>
            <p className={styles.gift}>{`${gift} ${finalGift} в подарок`}</p>
            <div className={styles.circle}>
              <p className={styles.weight}>{weight}</p>
              <p className={styles.units}>кг</p>
            </div>
          </div>
        </div>
      </div>
      <NoticeCard
        styles={styles}
        selected={selected}
        count={count}
        description={description}
        filler={filler}
      />
    </div>
  )
}
