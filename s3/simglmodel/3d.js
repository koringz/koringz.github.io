var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 400;
aaa();

function aaa() {
    var a, b, c, d, e, tim, max, x, y, x2, y2, px, py, tx, ty,
        r, mc, ms, st, len, gx, gy, gz, yp, yp2, xp, xp2, z;

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    tim = new Date().getTime() / 70;
    gz = Math.sin(tim / 31);
    gx = Math.sin(tim / 29) / 2;
    gy = Math.sin(tim / 37) / 2;

    a = tim / 79;
    yp = Math.cos(a);
    yp2 = Math.sin(a);
    a = tim / 77;
    xp = Math.cos(a);
    xp2 = Math.sin(a);

    ty = canvas.height / 2;
    tx = canvas.width / 2;
    py = 35;
    px = py * Math.sin(Math.PI / 3);
    for (d = 0; d < 3; d++) {
        r = Math.PI * 2 / 3 * d;
        mc = Math.cos(r);
        ms = Math.sin(r);
        for (a = 0; a < 10; a++) {
            for (b = 0; b < 10; b++) {
                c = 0;
                if (b % 2 == 1) c = 0.5;
                x = (b) * px + tim * 4;
                y = (a + c) * py;
                hisi(x, y, d);
            }
        }
    }

    d = st;
    for (z = 0; z < 10000; z++) {
        if (!st) break;
        e = d.q;
        ctx.beginPath();
        for (a = 0; a < e.length; a++) ctx.lineTo(tx + e[a][0] * 140, ty + e[a][1] * 140);
        ctx.closePath();
        c = "hsl(" + d.c + ",97%," + d.lit + "%)";
        ctx.fillStyle = c;
        ctx.strokeStyle = c;
        ctx.lineWidth = 1;
        ctx.fill();
        if (!d.tugi) break;
        d = d.tugi;
    }

    function hisi(x, y, col) {
            var a, b, c, d, e, x0, y0, x1, y1, z1, p, p1, p2, rx, ry,
                r1, r2, myp, myp2, z;
            p = [
                [x, y],
                [x + px / 2, y + py / 4],
                [x, y + py / 2],
                [x - px / 2, y + py / 4]
            ];
            len = 4;

            p1 = [];
            for (a = 0; a < 4; a++) {
                c = p[a];
                d = p[(a + 1) % 4];
                for (b = 0; b < len; b++) {
                    r1 = b / len;
                    r2 = 1 - r1;
                    x0 = c[0] * r2 + d[0] * r1;
                    y0 = c[1] * r2 + d[1] * r1;
                    p1.push([x0, y0]);
                }
            }
            p = p1;

            p2 = [];
            for (a = 0; a < p.length; a++) {
                x0 = p[a][0];
                y0 = p[a][1];
                if (col) {
                    x1 = x0 * mc - y0 * ms;
                    y1 = x0 * ms + y0 * mc;
                    x0 = x1;
                    y0 = y1;
                }

                rx = (x0 / px / 20) * Math.PI * 2;
                ry = (y0 / py / 20) * Math.PI * 2 + tim / 33;
                myp = Math.cos(rx);
                myp2 = Math.sin(rx);

                z = Math.cos(ry) / 2 + 1;
                y = Math.sin(ry) / 2;

                x = z * myp2;
                z = z * myp;

                y1 = y * yp + z * yp2;
                z1 = y * yp2 - z * yp;
                x1 = x * xp + z1 * xp2;
                z = x * xp2 - z1 * xp;
                z1 = Math.pow(1.4, z + gz);
                x = (x1 + gx) * z1;
                y = (y1 + gy) * z1;
                p2.push([x, y, z]);
            }
            pp(p2, col);
        } //hisi

    function pp(q, co) {
        var a, b, c, d, e, f, g, h, i, ob, col;
        ob = {
            q: q,
            c: (co * 120 + 55)
        };

        a = q[2 * len];
        b = q[1 * len];
        c = q[0];
        d = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
        e = [c[0] - b[0], c[1] - b[1], c[2] - b[2]];
        h = d[0] * e[1] - d[1] * e[0];

        f = d[1] * e[2] - d[2] * e[1];
        g = d[2] * e[0] - d[0] * e[2];

        if (h < 0) {
            h = -h;
            f = -f;
            g = -g;
            i = 1;
        }
        a = f - g * 0.7 + h * 1.2;
        b = Math.abs(f) + Math.abs(h) + Math.abs(g);
        a = a / b;
        a = a * 25 + 25;
        if (a < 10) a = 10;
        if (!i) a *= 0.4;
        ob.lit = a;
        a = (q[0][2] + q[1 * len][2] + q[2 * len][2] + q[3 * len][2]) / 4;

        ob.m = a;
        if (!st) {
            st = ob;
            return;
        }

        b = st;
        while (1) {
            if (b.m > a) {
                if (!b.mae) {
                    st = ob;
                } else {
                    b.mae.tugi = ob;
                }
                ob.mae = b.mae;
                b.mae = ob;
                ob.tugi = b;
                break;
            }
            if (!b.tugi) {
                b.tugi = ob;
                ob.mae = b;
                break;
            }
            b = b.tugi;
        }
    }
    requestAnimationFrame(aaa);
}