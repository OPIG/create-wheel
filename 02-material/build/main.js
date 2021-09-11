;(() => {
  'use strict'
  function e(e, t, n, o, i) {
    return {
      sel: e,
      data: t,
      children: n,
      text: o,
      elm: i,
      key: void 0 === t ? void 0 : t.key
    }
  }
  const t = Array.isArray
  function n(e) {
    return (
      'string' == typeof e ||
      'number' == typeof e ||
      e instanceof String ||
      e instanceof Number
    )
  }
  e('', {}, [], void 0, void 0)
  const o = ['create', 'update', 'remove', 'destroy', 'pre', 'post']
  function i(e, t) {
    let n, o
    const i = t.elm
    let r = e.data.class,
      s = t.data.class
    if ((r || s) && r !== s) {
      for (o in ((r = r || {}), (s = s || {}), r))
        r[o] &&
          !Object.prototype.hasOwnProperty.call(s, o) &&
          i.classList.remove(o)
      for (o in s)
        (n = s[o]), n !== r[o] && i.classList[n ? 'add' : 'remove'](o)
    }
  }
  const r = { create: i, update: i }
  function s(e, t) {
    let n, o, i
    const r = t.elm
    let s = e.data.props,
      l = t.data.props
    if ((s || l) && s !== l)
      for (n in ((s = s || {}), (l = l || {}), l))
        (o = l[n]),
          (i = s[n]),
          i === o || ('value' === n && r[n] === o) || (r[n] = o)
  }
  const l = { create: s, update: s },
    d =
      ('undefined' != typeof window &&
        window.requestAnimationFrame.bind(window)) ||
      setTimeout
  let a = !1
  function f(e, t, n) {
    var o
    ;(o = function () {
      e[t] = n
    }),
      d(function () {
        d(o)
      })
  }
  function c(e, t) {
    let n, o
    const i = t.elm
    let r = e.data.style,
      s = t.data.style
    if (!r && !s) return
    if (r === s) return
    ;(r = r || {}), (s = s || {})
    const l = 'delayed' in r
    for (o in r)
      s[o] ||
        ('-' === o[0] && '-' === o[1]
          ? i.style.removeProperty(o)
          : (i.style[o] = ''))
    for (o in s)
      if (((n = s[o]), 'delayed' === o && s.delayed))
        for (const e in s.delayed)
          (n = s.delayed[e]), (l && n === r.delayed[e]) || f(i.style, e, n)
      else
        'remove' !== o &&
          n !== r[o] &&
          ('-' === o[0] && '-' === o[1]
            ? i.style.setProperty(o, n)
            : (i.style[o] = n))
  }
  function u(e, t, n) {
    if ('function' == typeof e) e.call(t, n, t)
    else if ('object' == typeof e)
      for (let o = 0; o < e.length; o++) u(e[o], t, n)
  }
  function y(e, t) {
    const n = e.type,
      o = t.data.on
    o && o[n] && u(o[n], t, e)
  }
  function p(e, t) {
    const n = e.data.on,
      o = e.listener,
      i = e.elm,
      r = t && t.data.on,
      s = t && t.elm
    let l
    if (n !== r) {
      if (n && o)
        if (r) for (l in n) r[l] || i.removeEventListener(l, o, !1)
        else for (l in n) i.removeEventListener(l, o, !1)
      if (r) {
        const o = (t.listener =
          e.listener ||
          function e(t) {
            y(t, e.vnode)
          })
        if (((o.vnode = t), n))
          for (l in r) n[l] || s.addEventListener(l, o, !1)
        else for (l in r) s.addEventListener(l, o, !1)
      }
    }
  }
  function v(e, t, n) {
    if (
      ((e.ns = 'http://www.w3.org/2000/svg'),
      'foreignObject' !== n && void 0 !== t)
    )
      for (let e = 0; e < t.length; ++e) {
        const n = t[e].data
        void 0 !== n && v(n, t[e].children, t[e].sel)
      }
  }
  !(function (e, t) {
    const n = {
      create: [],
      update: [],
      remove: [],
      destroy: [],
      pre: [],
      post: []
    }
    for (const t of o)
      for (const o of e) {
        const e = o[t]
        void 0 !== e && n[t].push(e)
      }
  })([
    r,
    l,
    {
      pre: function () {
        a = !1
      },
      create: c,
      update: c,
      destroy: function (e) {
        let t, n
        const o = e.elm,
          i = e.data.style
        if (i && (t = i.destroy)) for (n in t) o.style[n] = t[n]
      },
      remove: function (e, t) {
        const n = e.data.style
        if (!n || !n.remove) return void t()
        let o
        a || (e.elm.offsetLeft, (a = !0))
        const i = e.elm
        let r = 0
        const s = n.remove
        let l = 0
        const d = []
        for (o in s) d.push(o), (i.style[o] = s[o])
        const f = getComputedStyle(i)['transition-property'].split(', ')
        for (; r < f.length; ++r) -1 !== d.indexOf(f[r]) && l++
        i.addEventListener('transitionend', function (e) {
          e.target === i && --l, 0 === l && t()
        })
      }
    },
    { create: p, update: p, destroy: p }
  ])
  const m = (function (o, i, r) {
    let s,
      l,
      d,
      a = {}
    if (
      (null !== i && (a = i),
      t(r) ? (s = r) : n(r) ? (l = r.toString()) : r.sel && (s = [r]),
      void 0 !== s)
    )
      for (d = 0; d < s.length; ++d)
        n(s[d]) && (s[d] = e(void 0, void 0, void 0, s[d], void 0))
    return (
      's' !== o[0] ||
        'v' !== o[1] ||
        'g' !== o[2] ||
        (3 !== o.length && '.' !== o[3] && '#' !== o[3]) ||
        v(a, s, o),
      e(o, a, s, l, void 0)
    )
  })(
    'a',
    { props: { href: 'http://www.atguigu.com', target: '_blank' } },
    '尚硅谷'
  )
  console.log(m)
})()
