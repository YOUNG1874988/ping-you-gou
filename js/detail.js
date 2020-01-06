// 等所有等静态页面加载完成之后才开始执行js代码
window.addEventListener('load', function() {
    var preimg = document.querySelector('.preview_img')
    var mask = document.querySelector('.mask')
    var big = document.querySelector('.big')
    var bigimg = document.querySelector('.bigimg')
        // 应当是经过包裹2个盒子的容器时显示2个盒子
        // 1.鼠标经过时显示2个盒子
    preimg.addEventListener('mouseover', function() {
            mask.style.display = 'block'
            big.style.display = 'block'
        })
        // 2.鼠标离开时隐藏2个盒子
    preimg.addEventListener('mouseout', function() {
            mask.style.display = 'none'
            big.style.display = 'none'
        })
        // 3.鼠标在盒子内时让小盒子跟随鼠标
    preimg.addEventListener('mousemove', function(e) {
        // 3.1计算出鼠标相对于盒子等横，纵坐标
        var x = e.pageX - preimg.offsetLeft
        var y = e.pageY - preimg.offsetTop

        // 3.2让小盒子等位置坐标等于第一步计算出的2个坐标值;并且让鼠标指针处于盒子的垂直水平居中位置
        // ***************遮挡层的移动距离：
        var maskX = x - mask.offsetWidth / 2
        var maskY = y - mask.offsetHeight / 2
            // 3.2判断小盒子的坐标值是否小于0，如果小于0就让其为0;
            //判断小盒子的坐标值是否超出临界值，如果超出让其等于临界值
        if (maskX < 0) {
            maskX = 0
        } else if (maskX > 100) {
            maskX = 100
        }
        if (maskY < 0) {
            maskY = 0
        } else if (maskY > 100) {
            maskY = 100
        }
        mask.style.top = maskY + 'px'
        mask.style.left = maskX + 'px'

        // 分别 求出小盒子和大盒子的最大移动距离
        // *****************大，小图片最大移动距离
        var maskMax = preimg.offsetWidth - mask.offsetWidth
        var bigMax = bigimg.offsetWidth - big.offsetWidth

        // 问题原因分析：没有足够大大对应图片放到大盒子中，导致上面的大盒子的宽度和大盒子图片的宽度相等，导致计算结果为0，所以大图片不会动
        console.log(bigimg.offsetWidth)
        console.log(big.offsetWidth)
            // var bigMax = big.offsetWidth - bigimg.offsetWidth
        console.log('this is maskmax')
        console.log(maskMax)
        console.log('this is bigmax')
        console.log(bigMax)
            //大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离/遮挡层最大移动距离
        var bigX = maskX * bigMax / maskMax
        var bigY = maskY * bigMax / maskMax
        console.log('this is bigx')
        console.log(bigX)
            // 给大图片 位置变化赋值,由于已经给装大图片大盒子设置相对定位，故改变大图片
            // 的绝对定位位置就可以改变图片的位置
        bigimg.style.top = -bigY + 'px'
        bigimg.style.left = -bigX + 'px'

    })
})