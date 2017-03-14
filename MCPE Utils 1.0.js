/*
MCPE Utils
© 2016 Dark Tornado, All rights reserved.
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

const white = android.graphics.Color.WHITE;
const yellow = android.graphics.Color.YELLOW;
const number = android.text.InputType.TYPE_CLASS_NUMBER;
const number2 = android.text.InputType.TYPE_NUMBER_FLAG_SIGNED;
const version = "1.0";

var btn = null;
var font = null;
var notFull = true;
var signEdit = false;
var useCmd = false;
var hideNameTag = false;
var homeData = [];

const Util = {
    makeMainText: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    btn = new android.widget.PopupWindow(ctx);
                    var txt = new MinecraftTextView(ctx);
                    txt.setText("Utils");
                    txt.setTextSize(17);
                    txt.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            Util.openSettings();
                        }
                    }));
                    var longTouchCheck = false;
                    txt.setOnLongClickListener(new android.view.View.OnLongClickListener({
                        onLongClick: function(v) {
                            longTouchCheck = true;
                            return true;
                        }
                    }));
                    txt.setOnTouchListener(new android.view.View.OnTouchListener({
                        onTouch: function(v, ev) {
                            try {
                                if(longTouchCheck) {
                                    switch(ev.action) {
                                        case android.view.MotionEvent.ACTION_MOVE:
                                            btn.update(ctx.getWindowManager().getDefaultDisplay().getWidth() - ev.getRawX() - dip2px(ctx, 20), ev.getRawY(), btn.getWidth(), btn.getHeight());
                                            break;
                                        case android.view.MotionEvent.ACTION_UP:
                                            longTouchCheck = false;
                                            break;
                                    }
                                }
                                return false;
                            } catch(e) {
                                clientMessage(e + ", " + e.lineNumber);
                            }
                        }
                    }));
                    var pad = dip2px(ctx, 5);
                    txt.setPadding(pad, pad, pad, pad);
                    btn.setContentView(txt);
                    btn.setWidth(-2);
                    btn.setHeight(-2);
                    btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, dip2px(ctx, 90), dip2px(ctx, 10));
                } catch(e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    openSettings: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var window = new android.widget.PopupWindow();
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    layout.setGravity(android.view.Gravity.CENTER);
                    var lays = [];
                    var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                    var title = new android.widget.TextView(ctx);
                    title.setText("MCPE   Utils");
                    title.setTextSize(25);
                    title.setTextColor(yellow);
                    title.setTypeface(font);
                    title.setGravity(android.view.Gravity.CENTER);
                    title.setBackgroundDrawable(widgetBack(3));
                    var pad = dip2px(ctx, 10);
                    title.setPadding(pad, pad, pad, dip2px(ctx, 16));
                    pad = dip2px(ctx, 5);
                    var mar = dip2px(ctx, 5);
                    margin.setMargins(mar, mar, mar, mar);
                    var sws = [];
                    var menus = ["Sign Editor", "Single Command", "Flying", "Creative Mode", "Hide My Name Tag"];
                    if(Level.getGameMode() == 0) menus[3] = "Survival Mode";
                    for(var n in menus) {
                        sws[n] = new MinecraftSwitch();
                        sws[n].setText(menus[n]);
                        sws[n].setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    }
                    sws[0].setChecked(signEdit);
                    sws[1].setChecked(useCmd);
                    sws[2].setChecked(Player.canFly());
                    sws[3].setChecked(Boolean(Level.getGameMode()));
                    sws[4].setChecked(hideNameTag);
                    sws[0].setOnChangedListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            signEdit = onoff;
                        }
                    }));
                    sws[1].setOnChangedListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            useCmd = onoff;
                        }
                    }));
                    sws[2].setOnChangedListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            Player.setCanFly(onoff);
                        }
                    }));
                    sws[3].setOnChangedListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            if(onoff) {
                                Level.setGameMode(1);
                                sws[3].setText("Creative Mode");
                            } else {
                                Level.setGameMode(0);
                                sws[3].setText("Survival Mode");
                            }
                        }
                    }));
                    sws[4].setOnChangedListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            hideNameTag = onoff;
                            if(onoff) Entity.setNameTag(Player.getEntity(), "");
                            else Entity.setNameTag(Player.getEntity(), ModPE.getUserName());
                        }
                    }));
                    for(var n in menus)
                        layout.addView(sws[n].mv());

                    margin.setMargins(mar, dip2px(ctx, 10), mar, dip2px(ctx, 15));
                    var fs = new MinecraftSwitch();
                    fs.setText("Using Full Screen Keyboard");
                    fs.setChecked(notFull);
                    fs.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    fs.setOnChangedListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            notFull = onoff;
                        }
                    }));
                    layout.addView(fs.mv());

                    var mar2 = dip2px(ctx, 10);
                    var btnParams = new android.widget.LinearLayout.LayoutParams(-1, -2, 1);
                    btnParams.setMargins(mar2, mar, mar2, mar);
                    lays[0] = new android.widget.LinearLayout(ctx);
                    var add = new MinecraftButton();
                    add.setText("Give Item");
                    add.setLayoutParams(btnParams);
                    add.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            Tool.giveItem();
                        }
                    }));
                    lays[0].addView(add);
                    var info = new MinecraftButton();
                    info.setText("ModPE Info.");
                    info.setLayoutParams(btnParams);
                    info.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            showDialog("ModPE Info.", "ModPE Name : MCPE Utils\nVersion : " + version + "\nMaker : Dark Tornado\n\nThis ModPE Script is made for Single Playing. You can drag to move the \"Utils\" text.\n\n\n<Command List>\n\n/day : Set time to day.\n/night : Set time to night\n/time [time] : Set time to [time].\n/heal : Set health to 20.\n/health [health] : Set health to [health].\n/tp [x] [y] [z] : Teleport to the position.\n/give [Item Id] [Amount] [Item Damage] : Add item to inventory\n/gm [Game Mode] : Ghange Game Mode.\n/set home : Set home.\n/home : Go to the home.\n/help : See command list.");
                        }
                    }));
                    lays[0].addView(info);

                    for(var n = 0; n < lays.length; n++) {
                        lays[n].setOrientation(0);
                        lays[n].setGravity(android.view.Gravity.CENTER);
                        lays[n].setWeightSum(2);
                        lays[n].setPadding(pad, pad, pad, pad);
                        layout.addView(lays[n]);
                    }
                    var maker = new MinecraftTextView();
                    maker.setText("\n© 2016 Dark Tornado, All rights reserved.");
                    maker.setTextSize(13);
                    maker.setGravity(android.view.Gravity.CENTER);
                    maker.setPadding(pad, pad, pad, pad);
                    layout.addView(maker);
                    pad = dip2px(ctx, 20);
                    layout.setPadding(pad, pad, pad, pad);
                    var scroll = new android.widget.ScrollView(ctx);
                    scroll.addView(layout);
                    var layout2 = new android.widget.LinearLayout(ctx);
                    layout2.setOrientation(1);
                    layout2.addView(title);
                    layout2.addView(scroll);
                    var pad = dip2px(ctx, 3);
                    layout2.setPadding(pad, pad, pad, pad);
                    window.setContentView(layout2);
                    window.setBackgroundDrawable(widgetBack(1));
                    window.setFocusable(true);
                    window.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
                    window.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
                    window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
                } catch(e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    }
};

const Tool = {
    signEditor: function(x, y, z) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new MinecraftDialog();
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var txt = [];
                    var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                    var mar = dip2px(ctx, 3);
                    margin.setMargins(mar, mar, mar, mar);
                    for(var n = 0; n < 4; n++) {
                        txt[n] = new MinecraftEditText();
                        txt[n].setHint("Line Number " + (n + 1));
                        txt[n].setText(Level.getSignText(x, y, z, n) + "");
                        txt[n].setTextSize(18);
                        txt[n].setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                        layout.addView(txt[n]);
                    }
                    dialog.setView(layout);
                    dialog.setTitle("Sign Edit");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Save", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            for(var n = 0; n < 4; n++)
                                Level.setSignText(x, y, z, n, txt[n].getText().toString());
                        }
                    });
                    dialog.show();
                } catch(e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    giveItem: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new MinecraftDialog();
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new MinecraftTextView();
                    var loc2 = new MinecraftEditText();
                    var loc3 = new MinecraftTextView();
                    var loc4 = new MinecraftEditText();
                    var loc5 = new MinecraftTextView();
                    var loc6 = new MinecraftEditText();
                    loc1.setText("Item Id : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Item Id...");
                    loc2.setInputType(number);
                    loc3.setText("Amount : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Amount...");
                    loc4.setInputType(number | number2);
                    loc5.setText("Item Damage : ");
                    loc5.setTextSize(18);
                    loc6.setHint("Input Item Damage...");
                    loc6.setInputType(number);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    layout.addView(loc3);
                    layout.addView(loc4);
                    layout.addView(loc5);
                    layout.addView(loc6);
                    dialog.setView(layout);
                    dialog.setTitle("Give Item");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Give", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            addItemInventory(loc2.getText(), loc4.getText(), loc6.getText());
                        }
                    });
                    dialog.show();
                } catch(e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    }
};

ModPE.getUserName = function() {
    try {
        var file = new java.io.File(sdcard + "/games/com.mojang/minecraftpe/options.txt");
        if(!(file.exists())) return "null";
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var str = br.readLine();
        var line = "";
        while((line = br.readLine()) != null) {
            str += "\n" + line;
        }
        fis.close();
        isr.close();
        br.close();
        var nn = str.split("\n");
        var nnn = nn[0].split(":");
        return nnn[1].toString();
    } catch(e) {
        clientMessage(e + ", " + e.lineNumber);
    }
};

var folder = new java.io.File(sdcard + "/darkTornado/");
folder.mkdir();

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function utilMessage(msg) {
    if(msg.indexOf("\n") == -1) {
        clientMessage("§e[Util] §7" + msg);
    } else {
        var msg2 = msg.toString().split("\n");
        clientMessage("§e[Util] §7" + msg2[0]);
        for(var n = 1; n < msg2.length; n++)
            clientMessage(" §7" + msg2[n]);
    }
}

function newLevel() {
    try {
        if(font == null) font = new android.graphics.Typeface.createFromFile(sdcard + "/darkTornado/mcpefont.tff");
    } catch(e) {
        utilMessage("Cannot find font file.\nPlease connect to Internet and restart Blocklauncher.");
    }
    Util.makeMainText();
}

function leaveGame() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            if(btn != null) {
                btn.dismiss();
                btn = null;
            }
        }
    }));
}

function useItem(x, y, z, i, b) {
    if(signEdit && (b == 63 || b == 68)) {
        Tool.signEditor(x, y, z);
        preventDefault();
    }
}

function procCmd(cmd) {
    var Data = cmd.split(" ");
    if(useCmd) {
        if(cmd == "day") {
            Level.setTime(1400);
            utilMessage("Time set to Day.");
        }
        if(cmd == "night") {
            Level.setTime(14000);
            utilMessage("Time set to Night.");
        }
        if(Data[0] == "time" && Data[1] != null) {
            Level.setTime(Data[1]);
            utilMessage("Time set to " + Data[1] + ".");
        }
        if(Data[0] == "tp" && Data[3] != null) {
            Entity.setPosition(Player.getEntity(), Data[1], Data[2], Data[3]);
            utilMessage("Teleported to [" + Data[1] + ", " + Data[2] + ", " + Data[3] + "].");
        }
        if(cmd == "heal") {
            Player.setHealth(20);
            utilMessage("Health set to 20.");
        }
        if(Data[0] == "health" && Data[1] != null) {
            Player.setHealth(Data[1]);
            utilMessage("Health set to " + Data[1] + ".");
        }
        if(Data[0] == "give" && Data[1] != null) {
            if(Data[3] != null) {
                addItemInventory(Data[1], Data[2], Data[3]);
                if(Data[2] > 1) utilMessage("Item Id " + Data[1] + ", Item Damage " + Data[3] + ", Amount " + Data[2] + " were given.");
                else utilMessage("Item Id " + Data[1] + ", Item Damage " + Data[3] + ", Amount " + Data[2] + " was given.");
            }
            if(Data[3] == null) {
                if(Data[2] == null) {
                    utilMessage("Item Id " + Data[1] + ", Amount 1 was given.");
                    addItemInventory(Data[1], 1, 0);
                }
                if(Data[2] <= 1) {
                    addItemInventory(Data[1], Data[2], 0)
                    utilMessage("Item Id " + Data[1] + ", Amount " + Data[2] + " was given.");
                } else if(Data[2] > 1) {
                    addItemInventory(Data[1], Data[2], 0)
                    utilMessage("Item Id " + Data[1] + ", Amount " + Data[2] + " were given.");
                }
            }
        }
        if(cmd == "gm 0") {
            Level.setGameMode(0);
            utilMessage("Set Game Mode to 0.");
        }
        if(cmd == "gm 1") {
            Level.setGameMode(1);
            utilMessage("Set Game Mode to 1.");
        }
        if(cmd == "set home") {
            homeData = [Player.getX(), Player.getY(), Player.getZ()];
            utilMessage("Home is set.");
        }
        if(cmd == "home") {
            Entity.setPosition(Player.getEntity(), homeData[0], homeData[1], homeData[2]);
            utilMessage("Teleported to the Home.");
        }
        if(cmd == "help") {
            utilMessage("<Command List>  /day, /night, /time [time], /heal, /health [health], /tp [x] [y] [z], /give [Item Id] [Amount] [Item Damage], /gm [Game Mode], /set home, /home\nYou can check more details with \"ModPE Info.\" Button.");
        }
    }
}

function showDialog(title, msg) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new MinecraftDialog();
                dialog.setTitle(title);
                dialog.setMessage(msg);
                dialog.setNegativeButton("Close", null);
                dialog.show();
            } catch(e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function utilSettingsRequestHook() {
    Util.openSettings();
}

//--Library---

var guiFile = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
var guiFile2 = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png"));
var widgetBack1 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 8, 32, 8, 8), dip2px(ctx, 8), dip2px(ctx, 8), false);
var widgetBack2 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 0, 32, 8, 8), dip2px(ctx, 8), dip2px(ctx, 8), false);
var matrix = new android.graphics.Matrix(); 
matrix.postScale(-1, -1);
var widgetBack3 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 0, 32, 8, 8, matrix, false), dip2px(ctx, 8), dip2px(ctx, 8), false);
var widgetBack4 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile2, 160, 206, 38, 19), dip2px(ctx, 76), dip2px(ctx, 38), false);
var widgetBack5 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile2, 198, 206, 38, 19), dip2px(ctx, 76), dip2px(ctx, 38), false);

function widgetBack(type) {
    var cache = dip2px(ctx, 3);
    if(type == 1) return createNinePatch(widgetBack1, cache, cache, cache, cache);
    if(type == 2) return createNinePatch(widgetBack2, cache, cache, cache, cache);
    if(type == 3) return createNinePatch(widgetBack3, cache, cache, cache, cache);
    if(type == 4) return new android.graphics.drawable.BitmapDrawable(widgetBack4);
    if(type == 5) return new android.graphics.drawable.BitmapDrawable(widgetBack5);
}

function MinecraftDialog() {
    this.dialog = new android.widget.PopupWindow();
    this.title = "";
    this.msg = null;
    this.pBtn = null;
    this.nBtn = null;
    this.view = null;
}

MinecraftDialog.prototype = {
    close: function() {
        try {
            this.dialog.dismiss();
        } catch(e) {
            print(e);
        }
    },
    setTitle: function(str) {
        this.title = str.toString();
    },
    setMessage: function(str) {
        this.msg = str.toString();
    },
    setPositiveButton: function(str, onClick2) {
        this.pBtn = new android.widget.Button(ctx);
        this.pBtn.setText(str);
        this.pBtn.setTextColor(white);
        this.pBtn.setTypeface(font);
        this.pBtn.setBackgroundDrawable(widgetBack(1));
        var margin = new android.view.ViewGroup.MarginLayoutParams(-2, -2);
        var mar = dip2px(ctx, 10);
        margin.setMargins(mar, dip2px(ctx, 15), mar, mar);
        this.pBtn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
        this.pBtn.setOnClickListener(onClick2);
        var cache = this;
        this.pBtn.setOnTouchListener(new android.view.View.OnTouchListener() {
            onTouch: function(v, ev) {
                if(ev.action == android.view.MotionEvent.ACTION_DOWN) {
                    cache.pBtn.setBackgroundDrawable(widgetBack(2));
                } else if(ev.action == android.view.MotionEvent.ACTION_UP) {
                    cache.pBtn.setBackgroundDrawable(widgetBack(1));
                    new android.os.Handler().postDelayed(new java.lang.Runnable({
                        run: function() {
                            cache.dialog.dismiss();
                        }
                    }), 50);
                    new java.lang.Thread({
                        run: function() {
                            java.lang.Thread.sleep(100);
                            Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.click", 10, 1);
                        }
                    }).start();
                }
                return false;
            }
        });
    },
    setNegativeButton: function(str, onClick) {
        this.nBtn = new android.widget.Button(ctx);
        this.nBtn.setText(str);
        this.nBtn.setTextColor(white);
        this.nBtn.setTypeface(font);
        this.nBtn.setBackgroundDrawable(widgetBack(1));
        var margin = new android.view.ViewGroup.MarginLayoutParams(-2, -2);
        var mar = dip2px(ctx, 10);
        margin.setMargins(mar, dip2px(ctx, 15), mar, mar);
        this.nBtn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
        this.nBtn.setOnClickListener(onClick);
        var cache = this;
        this.nBtn.setOnTouchListener(new android.view.View.OnTouchListener() {
            onTouch: function(v, ev) {
                if(ev.action == android.view.MotionEvent.ACTION_DOWN) {
                    cache.nBtn.setBackgroundDrawable(widgetBack(2));
                } else if(ev.action == android.view.MotionEvent.ACTION_UP) {
                    cache.nBtn.setBackgroundDrawable(widgetBack(1));
                    new android.os.Handler().postDelayed(new java.lang.Runnable({
                        run: function() {
                            cache.dialog.dismiss();
                        }
                    }), 50);
                    new java.lang.Thread({
                        run: function() {
                            java.lang.Thread.sleep(100);
                            Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.click", 10, 1);
                        }
                    }).start();
                }
                return false;
            }
        });
    },
    setView: function(layout) {
        this.view = layout;
    },
    show: function() {
        try {
            var dialog = this.dialog;
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var title = new android.widget.TextView(ctx);
            title.setText(this.title);
            title.setTextSize(25);
            title.setTextColor(yellow);
            title.setTypeface(font);
            title.setGravity(android.view.Gravity.CENTER);
            title.setBackgroundDrawable(widgetBack(3));
            var pad = dip2px(ctx, 10);
            title.setPadding(pad, pad, pad, dip2px(ctx, 15));
            if(this.msg != null) {
                var text = new android.widget.TextView(ctx);
                text.setText(this.msg);
                text.setTextColor(white);
                text.setTextSize(18);
                text.setTypeface(font);
                var pad = dip2px(ctx, 5);
                text.setPadding(pad, pad, pad, dip2px(ctx, 15));
                layout.addView(text);
            }
            var btnLayout = new android.widget.LinearLayout(ctx);
            btnLayout.setOrientation(0);
            if(this.nBtn != null) {
                if(this.pBtn) this.nBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 1 / 3 - dip2px(ctx, 25));
                else this.nBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3 - dip2px(ctx, 40));
                btnLayout.addView(this.nBtn);
            }
            if(this.pBtn != null) {
                if(this.nBtn) this.pBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 1 / 3 - dip2px(ctx, 25));
                else this.pBtn.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3 - dip2px(ctx, 40));
                btnLayout.addView(this.pBtn);
            }
            if(this.view != null) layout.addView(this.view);
            layout.addView(btnLayout);
            var pad = dip2px(ctx, 15);
            layout.setPadding(pad, pad, pad, pad);
            var scroll = new android.widget.ScrollView(ctx);
            scroll.addView(layout);
            var layout2 = new android.widget.LinearLayout(ctx);
            layout2.setOrientation(1);
            layout2.addView(title);
            layout2.addView(scroll);
            dialog.setContentView(layout2);
            dialog.setFocusable(true);
            dialog.setBackgroundDrawable(widgetBack(1));
            dialog.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth() * 2 / 3);
            dialog.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight() * 4 / 5);
            dialog.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
        } catch(e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    }
};

function MinecraftButton() {
    var btn = new android.widget.Button(ctx);
    btn.setBackgroundDrawable(widgetBack(1));
    btn.setTextColor(white);
    btn.setTypeface(font);
    btn.setOnTouchListener(new android.view.View.OnTouchListener() {
        onTouch: function(v, ev) {
            if(ev.action == android.view.MotionEvent.ACTION_DOWN) {
                btn.setBackgroundDrawable(widgetBack(2));
            } else if(ev.action == android.view.MotionEvent.ACTION_UP) {
                btn.setBackgroundDrawable(widgetBack(1));
                new java.lang.Thread({
                    run: function() {
                        java.lang.Thread.sleep(100);
                        Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.click", 10, 1);
                    }
                }).start();
            }
            return false;
        }
    });
    return btn;
}

function MinecraftSwitch() {
    try {
        this.layout = new android.widget.LinearLayout(ctx);
        this.txt = new android.widget.TextView(ctx);
        this.btn = new android.widget.ToggleButton(ctx);
        this.layout.setOrientation(0);
        this.layout.setWeightSum(10);
        this.txt.setTextSize(16);
        this.txt.setTextColor(white);
        this.txt.setTypeface(font);
        this.txt.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
        this.txt.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2, 9));
        this.btn.setText("");
        this.btn.setTextOn("");
        this.btn.setTextOff("");
        this.btn.setGravity(android.view.Gravity.LEFT | android.view.Gravity.CENTER_VERTICAL);
        this.btn.setLayoutParams(new android.widget.LinearLayout.LayoutParams(dip2px(ctx, 76), dip2px(ctx, 38), 1));
        this.btn.setBackgroundDrawable(widgetBack(4));
        this.btn.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                if(v.isChecked()) v.setBackgroundDrawable(widgetBack(5));
                else v.setBackgroundDrawable(widgetBack(4));
            }
        }));
    } catch(e) {
        clientMessage(e + ", " + e.lineNumber);
    }
}

MinecraftSwitch.prototype = {
    setText: function(txt) {
        this.txt.setText(txt);
    },
    setChecked: function(isChecked) {
        if(isChecked) this.btn.setBackgroundDrawable(widgetBack(5));
        else this.btn.setBackgroundDrawable(widgetBack(4));
        this.btn.setChecked(isChecked);
    },
    setOnChangedListener: function(listener) {
        this.btn.setOnCheckedChangeListener(listener);
    },
    setLayoutParams: function(params) {
        this.layout.setLayoutParams(params);
    },
    mv: function() {
        this.layout.addView(this.txt);
        this.layout.addView(this.btn);
        return this.layout;
    }
};

function MinecraftTextView() {
    var txt = new android.widget.TextView(ctx);
    txt.setTextColor(white);
    txt.setTypeface(font);
    var pad = dip2px(ctx, 1);
    txt.setPadding(pad, pad, pad, pad);
    return txt;
}

function MinecraftEditText() {
    var txt = new android.widget.EditText(ctx);
    txt.setBackgroundDrawable(widgetBack(2));
    txt.setTextColor(white);
    txt.setTypeface(font);
    var pad = dip2px(ctx, 3);
    txt.setPadding(pad, pad, pad, pad);
    if(notFull) txt.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_FULLSCREEN);
    return txt;
}

function createNinePatch(bitmap, x, y, xx, yy) { //Original Sorce from 아보가토맨
    var NO_COLOR = 0x00000001;
    var buffer = java.nio.ByteBuffer.allocate(56).order(java.nio.ByteOrder.nativeOrder());
    buffer.put(0x01);
    buffer.put(0x02);
    buffer.put(0x02);
    buffer.put(0x02);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(0);
    buffer.putInt(y - 1);
    buffer.putInt(yy);
    buffer.putInt(x - 1);
    buffer.putInt(xx);
    buffer.putInt(NO_COLOR);
    buffer.putInt(NO_COLOR);
    var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
    return drawable;
}

try {
    var file = new java.io.File(sdcard + "/darkTornado/mcpefont.tff");
    if(!file.exists()) createFontFileFromWeb();
    else font = new android.graphics.Typeface.createFromFile(sdcard + "/darkTornado/mcpefont.tff");
} catch(e) {
    print(e);
}

function createFontFileFromWeb() {
    try {
        var url = new java.net.URL("https://www.dropbox.com/s/dn4weguewj5ixaf/minecraft.ttf?dl=1");
        var con = url.openConnection();
        if(con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var bis = new java.io.BufferedInputStream(con.getInputStream());
            var file = new java.io.File(sdcard + "/darkTornado/mcpefont.tff");
            var fos = new java.io.FileOutputStream(file);
            var bos = new java.io.BufferedOutputStream(fos);
            var buf;
            while((buf = bis.read()) != -1) {
                bos.write(buf);
            }
            bis.close();
            bos.close();
            con.disconnect();
            fos.close();
        }
    } catch(e) {
        print(e);
    }
}

