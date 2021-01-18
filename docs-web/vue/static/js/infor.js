var GLOBALS = (function($) {
    return {
        $win: $(window),
        $doc: $(document)
    };
})(jQuery);
var INFOR = (function($) {
    var $win = GLOBALS.$win,
        $doc = GLOBALS.$doc,
        winWidth = $win.width() + scrollBarWidth();

    function scrollBarWidth() {
        document.body.style.overflow = "hidden";
        var width = document.body.clientWidth;
        document.body.style.overflow = "scroll";
        width -= document.body.clientWidth;
        if (!width) {
            width = document.body.offsetWidth - document.body.clientWidth;
        }
        document.body.style.overflow = "";
        return width
    }
    $win.resize(function() {
        winWidth = $win.width() + scrollBarWidth()
    });

    function siteNav() {
        var body = $("body"),
            header = $("#global-header"),
            navToggle = $("#toggle-nav"),
            nav = $("#nav"),
            navItem = nav.find(".nav-item"),
            utilityNav = $("#utility-nav"),
            utilityNavItem = utilityNav.find("li").not(".search"),
            panelToggle = utilityNav.find("button"),
            panels = header.find(".utility-panels"),
            panel = header.find(".utility-panel");
        if (header.length) {
            checkWidth();
            navToggle.on("click", function() {
                if (!body.hasClass("nav-engaged")) {
                    body.addClass("nav-engaged");
                    navToggle.removeClass("reverse")
                } else {
                    body.removeClass("nav-engaged");
                    navToggle.addClass("reverse")
                }
            });
            navItem.each(function() {
                var $this = $(this);
                if ($this.find(".sub-menu").length) {
                    var topLevelAnchor = $this.find("span:first a").clone().addClass("top-level-item");
                    topLevelAnchor.insertAfter($this.find(".sub-menu .menu-toggle.level-1"))
                }
                $this.find("span:first-child").on("click", function() {
                    nav.addClass("level-2-active");
                    $this.addClass("is-active")
                });
                $this.find(".level-1").on("click", function() {
                    nav.removeClass("level-2-active");
                    $this.removeClass("is-active")
                });
                $this.find(".title").on("click", function() {
                    nav.addClass("level-3-active");
                    $(this).next(".menu").addClass("is-active")
                });
                $this.find(".level-2").on("click", function() {
                    nav.removeClass("level-3-active");
                    var _this = $(this);
                    setTimeout(function() {
                        _this.parent().removeClass("is-active")
                    }, 300)
                })
            });
            nav.find(".nav-item span:first-child").on("click", function() {
                if (winWidth > 1024) {
                    return true
                } else {
                    return false
                }
                $win.on("resize", function() {
                    if (winWidth > 1024) {
                        return true
                    } else {
                        return false
                    }
                })
            });
            utilityNavItem.each(function() {
                $(this).find("button").on("click", function() {
                    var $this = $(this),
                        panelAttr = $this.attr("data-panel");
                    if (!$this.hasClass("is-active")) {
                        panelToggle.removeClass("is-active");
                        panel.removeClass("is-active");
                        body.addClass("nav-panel-engaged");
                        var panelHeight = $("#" + panelAttr).outerHeight();
                        panels.css("height", panelHeight);
                        $this.addClass("is-active");
                        $("#" + panelAttr).addClass("is-active");
                        panels.removeClass("is-open customers-panel-is-open contact-panel-is-open language-panel-is-open");
                        panels.addClass("is-open");
                        panels.addClass(panelAttr + "-is-open");
                        try {
                            dcsMultiTrack("WT.es", window.location.href, "WT.dl", "99")
                        } catch (e) {
                            $("Exception in creating webtrend object for button tracking")
                        }
                    } else {
                        body.removeClass("nav-panel-engaged");
                        $this.removeClass("is-active");
                        $("#" + panelAttr).removeClass("is-active");
                        panels.removeClass("is-open");
                        panels.removeClass(panelAttr + "-is-open")
                    }
                })
            });
            $doc.on("click touchstart", function(ev) {
                if ((header.has(ev.target).length === 0) && (body.hasClass("nav-engaged"))) {
                    body.removeClass("nav-engaged");
                    navToggle.addClass("reverse")
                }
                if ((header.has(ev.target).length === 0) && (body.hasClass("nav-panel-engaged"))) {
                    body.removeClass("nav-panel-engaged");
                    panelToggle.removeClass("is-active");
                    panel.removeClass("is-active");
                    panels.removeClass("is-open customers-panel-is-open contact-panel-is-open language-panel-is-open")
                }
            });
            $win.on("resize", function() {
                checkWidth()
            })
        }

        function checkWidth() {
            if (winWidth <= 1100) {
                nav.find(".nav-item:last-child").addClass("push-left")
            } else {
                nav.find(".nav-item:last-child").removeClass("push-left")
            }
        }
    }
    $.fn.image2x = function() {
        var pluginName = "image2x";

        function Plugin(el) {
            this.el = $(el), this.init()
        }
        Plugin.prototype = {
            init: function() {
                if (this.el.css("font-size") == "1px") {
                    this.getImage()
                }
            },
            getImage: function() {
                var self = this,
                    imgWidth = this.el.width(),
                    img2x = this.el.attr("data-img-2x"),
                    needsContainer = this.el.attr("data-img-container");
                self.setImage(img2x, imgWidth, needsContainer)
            },
            setImage: function(src, width, needsContainer) {
                if (!src == "") {
                    this.el.attr("src", src);
                    if (needsContainer === "true") {
                        this.el.wrap('<div class="image-container-2x"></div>').parent().css("max-width", width)
                    }
                }
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this))
        })
    };
    $.fn.chatPopup = function(opts) {
        var pluginName = "chatPopup",
            defaults = {
                url: "http://www.infor.com/InstantService/design2012/ISchat.jsp"
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.isTablet = false, this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                self.el.on("click", function() {
                    if (self.isTablet == false) {
                        window.open(settings.url, "window", "width=500,height=700,resiable=yes");
                        return false
                    } else {
                        return true
                    }
                });
                self.tabletDetection();
                $win.on("resize", function() {
                    self.tabletDetection()
                })
            },
            tabletDetection: function() {
                var self = this;
                if (winWidth <= 1024) {
                    self.isTablet = true
                } else {
                    self.isTablet = false
                }
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.scrollTo = function(opts) {
        var pluginName = "scrollTo",
            defaults = {
                addedOffset: 0,
                speed: 500,
                onComplete: null
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this,
                    animationComplete = false;
                $("html, body").animate({
                    scrollTop: self.el.offset().top - settings.addedOffset
                }, settings.speed, function() {
                    if (!animationComplete && settings.onComplete) {
                        settings.onComplete.call(self);
                        animationComplete = true
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.modal = function(opts) {
        var pluginName = "modal",
            defaults = {
                trigger: "click",
                delay: 500,
                overlay: true
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                this.overlay = $('<div class="modal-overlay"></div>');
                this.trigger = $('button[data-modal="' + this.el.attr("id") + '"]');
                if (settings.trigger == "click") {
                    this.trigger.on("click", function() {
                        self.openModal()
                    })
                }
                if (settings.trigger == "immediate") {
                    setTimeout(function() {
                        self.openModal()
                    }, settings.delay)
                }
                this.el.find(".btn-close").on("click", function() {
                    self.closeModal()
                })
            },
            openModal: function() {
                var self = this;
                if (settings.overlay === true) {
                    this.overlay.appendTo("body")
                }
                setTimeout(function() {
                    $("body").addClass("modal-engaged")
                }, 1);
                this.el.addClass("is-visible").attr({
                    role: "dialog",
                    "aria-hidden": false,
                    "aria-modal": true
                });
                $("body > *").not(this.el).attr("aria-hidden", true);
                setTimeout(function() {
                    self.el.find(".btn-close").focus()
                }, 100);
                $doc.bind("keyup", this.keyPressing())
            },
            closeModal: function() {
                var self = this;
                $("body").removeClass("modal-engaged");
                if (settings.overlay === true) {
                    setTimeout(function() {
                        self.overlay.remove()
                    }, 300)
                }
                this.el.removeClass("is-visible").attr("aria-hidden", true);
                $("body > *").not(this.el).attr("aria-hidden", false);
                this.trigger.focus();
                $doc.unbind("keyup", this.keyPressing())
            },
            keyPressing: function() {
                var self = this;
                $doc.keyup(function(e) {
                    if (e.keyCode == 27) {
                        self.closeModal()
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this))
        })
    };
    $.fn.overlay = function(opts) {
        var pluginName = "overlay",
            defaults = {
                trigger: "click",
                onComplete: null
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                this.trigger = $('button[data-overlay="' + this.el.attr("id") + '"]');
                if (settings.trigger == "click") {
                    this.trigger.on("click", function() {
                        self.openOverlay()
                    })
                }
                this.el.find(".btn-close").on("click", function() {
                    self.closeOverlay()
                })
            },
            openOverlay: function() {
                var self = this;
                $("body").addClass("overlay-engaged");
                this.trigger.addClass("is-active");
                this.el.css({
                    opacity: 1,
                    visibility: "visible"
                });
                this.el.addClass("is-visible").attr("aria-hidden", false);
                $("body > *").not(this.el).attr("aria-hidden", true);
                $doc.bind("keyup", this.keyPressing());
                if (settings.onComplete) {
                    settings.onComplete.call(self)
                }
            },
            closeOverlay: function() {
                $("body").removeClass("overlay-engaged");
                this.trigger.removeClass("is-active");
                this.el.css({
                    opacity: 0,
                    visibility: "hidden"
                });
                this.el.removeClass("is-visible").attr("aria-hidden", true);
                $("body > *").not(this.el).attr("aria-hidden", false);
                this.trigger.focus();
                $doc.unbind("keyup", this.keyPressing())
            },
            keyPressing: function() {
                var self = this;
                $doc.keyup(function(e) {
                    if (e.keyCode == 27) {
                        self.closeOverlay()
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.togglableBlocks = function(opts) {
        var pluginName = "togglableBlocks",
            defaults = {
                collapseAll: false
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.block = this.el.find(".block"), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                this.blockToggling();
                $doc.on("click touchstart", function(ev) {
                    if ((self.el.has(ev.target).length === 0)) {
                        self.block.removeClass("is-active")
                    }
                })
            },
            blockToggling: function() {
                var self = this;
                this.block.each(function() {
                    var _this = $(this);
                    _this.find(".toggle").on("click", function() {
                        if (!_this.hasClass("is-active")) {
                            if (settings.collapseAll === true) {
                                self.block.removeClass("is-active")
                            }
                            _this.addClass("is-active")
                        } else {
                            _this.removeClass("is-active")
                        }
                    })
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.tabs = function(opts) {
        var pluginName = "tabs",
            defaults = {
                scrollableTabs: false,
                stackedTabs: false,
                scrollToOffset: null
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.tabs = this.el.find(".tabs"), this.panels = this.el.find(".panels"), this.hashValue, this.init()
        }
        Plugin.prototype = {
            init: function() {
                this.tabs.attr("role", "tablist");
                this.tabs.find("li").attr("role", "tab");
                this.panels.find(".panel").attr({
                    role: "tabpanel",
                    "aria-hidden": true
                });
                this.tabs.find("li:first-child").addClass("is-selected");
                this.panels.find(".panel:first-child").addClass("is-selected").attr("aria-hidden", false);
                this.tabs.find("li").each(function(idx) {
                    $(this).attr("data-num", idx)
                });
                this.tabToggling();
                if (settings.scrollableTabs === true) {
                    this.scrollableTabs()
                }
                if (settings.stackedTabs === true) {
                    this.stackedTabs()
                }
                this.hashTagDetection()
            },
            tabToggling: function() {
                var self = this;
                self.tabs.find("li").on("click", function() {
                    var id = $(this).find("a").attr("href");
                    self.selectTab(id);
                    return false
                })
            },
            selectTab: function(id) {
                var self = this;
                self.tabs.find("li").removeClass("is-selected");
                self.tabs.find("li").each(function() {
                    if (($(this).find("a").attr("href") == id)) {
                        $(this).addClass("is-selected")
                    }
                });
                self.showPanel(id)
            },
            showPanel: function(id) {
                this.panels.find(".panel").removeClass("is-selected").attr("aria-hidden", true);
                this.panels.find(id).addClass("is-selected").attr("aria-hidden", false)
            },
            scrollableTabs: function() {
                var self = this;
                this.tabCount = self.tabs.find("li").length;
                var tabsWidth = [];
                self.tabs.find("li").each(function() {
                    tabsWidth.push(parseInt($(this).outerWidth(true)))
                });
                var totalTabWidth = 0;
                for (var i = 0; i < tabsWidth.length; i++) {
                    totalTabWidth += tabsWidth[i] << 0
                }
                this.tabHeight = self.tabs.find("li").outerHeight();
                self.tabs.css({
                    height: this.tabHeight,
                    overflow: "hidden"
                });
                self.tabs.wrap('<div class="tabs-container"><div class="tabs-scroller"></div></div>').parent().css("overflow-x", "auto");
                self.tabs.css("width", totalTabWidth + 10);
                self.el.removeClass("scrollable-tabs")
            },
            scrollLeftToTab: function(id) {
                var self = this,
                    tab = self.tabs.find("li"),
                    tabWidth = tab.width();
                if (settings.scrollableTabs === true) {
                    self.tabs.find("li").each(function() {
                        if (($(this).find("a").attr("href") == id)) {
                            var tabNum = $(this).attr("data-num"),
                                scrollPos = tabNum * tabWidth;
                            self.el.find(".tabs-scroller").scrollLeft(scrollPos)
                        }
                    })
                }
            },
            checkIfTabExists: function(id) {
                var self = this,
                    tab = self.tabs.find("li");
                if (settings.scrollableTabs === true) {
                    self.tabs.find("li").each(function() {
                        var href = $(this).find("a").attr("href");
                        if (href == id) {
                            self.hashValue = id
                        }
                    })
                }
            },
            hashTagDetection: function() {
                var self = this;
                if (document.location.hash != "") {
                    var hash = window.location.hash;
                    self.checkIfTabExists(hash);
                    if (self.hashValue == hash) {
                        self.scrollLeftToTab(hash);
                        self.selectTab(hash);
                        if (winWidth > 1024) {
                            self.el.scrollTo({
                                addedOffset: settings.scrollToOffset
                            })
                        } else {
                            self.el.scrollTo()
                        }
                    }
                }
                $win.on("hashchange", function() {
                    var hash = window.location.hash;
                    self.checkIfTabExists(hash);
                    if (self.hashValue == hash) {
                        self.scrollLeftToTab(hash);
                        self.selectTab(hash);
                        if (winWidth > 1024) {
                            self.el.scrollTo({
                                addedOffset: settings.scrollToOffset
                            })
                        } else {
                            self.el.scrollTo()
                        }
                    }
                })
            },
            stackedTabs: function() {
                var self = this;
                this.el.addClass("stacked-tabs");
                self.tabs.find("li").each(function() {
                    var title = $(this).find("a").text();
                    var id = $(this).find("a").attr("href");
                    this.stackedTabToggle = $('<button class="stacked-tab-toggle" data-panel="' + id + '"><span class="title">' + title + '</span><span class="icon"></span></button>');
                    self.panels.find(id).wrapInner('<div class="panel-content"></div>').prepend(this.stackedTabToggle)
                });
                self.panels.find(".stacked-tab-toggle").on("click", function() {
                    if (!$(this).hasClass("stacked-tab-toggle-selected")) {
                        $(this).addClass("stacked-tab-toggle-selected");
                        $(this).next(".panel-content").addClass("stacked-tab-panel-selected")
                    } else {
                        $(this).removeClass("stacked-tab-toggle-selected");
                        $(this).next(".panel-content").removeClass("stacked-tab-panel-selected")
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.formValidator = function(opts) {
        var pluginName = "formValidator",
            defaults = {
                onSubmit: null,
                onSuccess: null,
                disableSubmit: null
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.isValid = true, this.field = this.el.find(".field.req"), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                this.el.on("submit", function() {
                    self.isValid = true;
                    self.validateTextField();
                    self.validateSelectField();
                    if (settings.onSubmit) {
                        settings.onSubmit.call(self)
                    }
                    if (settings.onSuccess && self.isValid === true) {
                        settings.onSuccess.call(self)
                    }
                    if (settings.disableSubmit === true) {
                        self.isValid = false
                    }
                    return self.isValid
                })
            },
            validateTextField: function() {
                var self = this;
                self.field.each(function() {
                    var $this = $(this),
                        label = $this.find("label").text().replace("*", ""),
                        textInput = $this.find(".input-text"),
                        emailInput = $this.find('input[type="email"]'),
                        errorMsg = '<div class="error-msg">' + label + " is required.</div>";
                    if (textInput.length) {
                        if ($.trim(textInput.val()).length === 0) {
                            if (!$this.hasClass("error")) {
                                $this.addClass("error");
                                $this.append(errorMsg);
                                $this.find("input").attr("aria-invalid", true)
                            }
                            self.isValid = false
                        } else {
                            if ($.trim(emailInput.val()).length > 0) {
                                $this.removeClass("error");
                                $this.find(".error-msg").remove();
                                errorMsg = '<div class="error-msg">' + label + " is not valid.</div>";
                                if (!self.validateEmail(emailInput.val())) {
                                    $this.addClass("error");
                                    $this.find("input").attr("aria-invalid", true);
                                    $this.append(errorMsg);
                                    self.isValid = false
                                } else {
                                    $this.removeClass("error");
                                    $this.find("input").attr("aria-invalid", false);
                                    $this.find(".error-msg").remove()
                                }
                            } else {
                                if ($this.hasClass("error")) {
                                    $this.removeClass("error");
                                    $this.find("input").attr("aria-invalid", false);
                                    $this.find(".error-msg").remove()
                                }
                            }
                        }
                    }
                })
            },
            validateEmail: function(email) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(email)
            },
            validateSelectField: function() {
                var self = this;
                self.field.each(function() {
                    var $this = $(this),
                        label = $this.find("label").text().replace("*", ""),
                        selectInput = $this.find(".input-select"),
                        errorMsg = '<div class="error-msg">' + label + " is required.</div>";
                    if (selectInput.length) {
                        if (selectInput.find("option").not(":first").is(":selected")) {
                            if ($this.hasClass("error")) {
                                $this.removeClass("error");
                                $this.find(".error-msg").remove();
                                $this.find("select").attr("aria-invalid", false)
                            }
                        } else {
                            $this.removeClass("error");
                            $this.find(".error-msg").remove();
                            $this.addClass("error");
                            $this.find("select").attr("aria-invalid", true);
                            $this.append(errorMsg);
                            self.isValid = false
                        }
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.videoModal = function(opts) {
        var pluginName = "videoModal",
            defaults = {
                trigger: "click",
                onComplete: null,
                videoType: null
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                this.setup();
                if (settings.trigger == "click") {
                    this.trigger.on("click", function() {
                        self.openModal()
                    })
                }
            },
            setup: function() {
                this.trigger = this.el;
                this.overlay = $('<div class="modal-overlay"></div>');
                this.modal = $('<div id="video-modal" class="modal video-modal"><div class="modal-window"><button class="btn-close">Close</button><div class="modal-content"><div class="video-container"></div></div></div></div>');
                this.videoContainer = this.modal.find(".video-container");
                this.videoURL = this.el.attr("data-video-url");
                this.videoDimensions = this.el.attr("data-video-dimensions").split(",");
                this.videoWidth = this.videoDimensions[0];
                this.videoHeight = this.videoDimensions[1];
                this.videoAutoPlay = this.el.attr("data-video-autoplay");
                this.iframe = $('<iframe src="' + this.videoURL + '" height="' + this.videoHeight + '" width="' + this.videoWidth + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            },
            openModal: function() {
                var self = this;
                this.overlay.appendTo("body");
                setTimeout(function() {
                    $("body").addClass("modal-engaged")
                }, 1);
                this.trigger.addClass("is-active");
                this.modal.appendTo("body");
                this.iframe.appendTo(this.videoContainer);
                $("body > *").not(this.modal).attr("aria-hidden", true);
                if ($("html").hasClass("ie7") || $("html").hasClass("ie8")) {
                    this.modal.css({
                        height: this.videoHeight + "px",
                        "margin-left": -(this.videoWidth / 2) + "px",
                        "margin-top": -(this.videoHeight / 2) + "px",
                        overflow: "visible",
                        padding: 0,
                        width: this.videoWidth + "px"
                    })
                }
                this.modal.addClass("is-visible").attr({
                    role: "dialog",
                    "aria-hidden": false,
                    "aria-modal": true
                });
                if (this.videoAutoPlay === "true") {
                    this.iframe.vimeo("play")
                }
                $doc.bind("keyup", this.keyPressing());
                this.modal.find(".btn-close").on("click", function() {
                    self.closeModal()
                })
            },
            closeModal: function() {
                var self = this;
                $("body").removeClass("modal-engaged");
                this.trigger.removeClass("is-active");
                setTimeout(function() {
                    self.overlay.remove()
                }, 300);
                this.modal.remove();
                $("body > *").not(this.modal).attr("aria-hidden", false);
                $doc.unbind("keyup", this.keyPressing())
            },
            keyPressing: function() {
                var self = this;
                $doc.keyup(function(e) {
                    if (e.keyCode == 27) {
                        self.closeModal()
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.togglableContent = function(opts) {
        var pluginName = "togglableContent",
            defaults = {
                toggleClass: ".toggle"
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.toggle = this.el.find(settings.toggleClass), this.init()
        }
        Plugin.prototype = {
            init: function() {
                this.toggling()
            },
            toggling: function() {
                var self = this;
                self.toggle.on("click", function() {
                    if (!self.el.hasClass("is-active")) {
                        self.el.addClass("is-active")
                    } else {
                        self.el.removeClass("is-active")
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.scrollToSection = function(opts) {
        var pluginName = "scrollToSection",
            defaults = {
                enableScroller: false,
                sectionClass: ".section",
                position: -1,
                scrollOffset: 0
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.section = $(settings.sectionClass), this.sectionCount = this.section.length, this.position = settings.position, this.init()
        }
        Plugin.prototype = {
            init: function() {
                this.setup();
                this.positionDetection()
            },
            setup: function() {
                this.section.each(function(index) {
                    $(this).attr("data-count", index)
                });
                if (settings.enableScroller === true) {
                    this.buildSectionScroller()
                }
            },
            positionDetection: function() {
                var self = this;
                $win.on("resize scroll", function() {
                    var currentPos = $(this).scrollTop();
                    self.section.removeClass("section-active").each(function() {
                        var topY = $(this).offset().top - settings.scrollOffset,
                            bottomY = topY + $(this).outerHeight();
                        if (currentPos > topY && currentPos < bottomY) {
                            $(this).addClass("section-active");
                            var sectionPos = $(this).attr("data-count");
                            self.position = sectionPos
                        }
                    })
                })
            },
            buildSectionScroller: function() {
                this.sectionScroller = $('<div id="section-scroller" class="section-scroller"><button class="prev">Previous section</button><button class="next">Next section</button></div>');
                this.scrollNext = this.sectionScroller.find(".next");
                this.scrollPrev = this.sectionScroller.find(".prev");
                this.sectionScroller.appendTo("body");
                this.sectionScrollerScrolling(this.scrollNext, this.scrollPrev)
            },
            sectionScrollerScrolling: function(scrollNext, scrollPrev) {
                var self = this;
                scrollNext.on("click", function() {
                    if (self.position < self.sectionCount - 1) {
                        self.position++;
                        $(self.section[self.position]).scrollTo({
                            addedOffset: -1
                        })
                    }
                });
                scrollPrev.on("click", function() {
                    if (self.position > 0) {
                        self.position--;
                        $(self.section[self.position]).scrollTo()
                    }
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.equalHeights = function(opts) {
        var pluginName = "equalHeights",
            defaults = {
                className: null,
                extraSpace: null
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el).find(settings.className), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                self.compareHeights();
                $win.on("resize", function() {
                    self.compareHeights()
                })
            },
            compareHeights: function() {
                var self = this,
                    tallest = 0;
                self.el.css("min-height", 0);
                self.el.each(function() {
                    var thisHeight = $(this).outerHeight();
                    if (thisHeight >= tallest) {
                        tallest = thisHeight
                    }
                });
                self.el.css("min-height", tallest + settings.extraSpace)
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.pageHeader = function(opts) {
        var pluginName = "pageHeader",
            defaults = {
                headerEl: "#global-header",
                sectionEl: "[data-section-track]"
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.body = $("body"), this.currentPos, this.upwardScroll = false, this.offsetFromTop = this.el.offset().top, this.elOffset = this.el.outerHeight() - 1, this.headerEl = $(settings.headerEl), this.sectionEl = $(settings.sectionEl), this.navEl = this.el.find(".nav"), this.navMobileLabel = this.navEl.attr("data-mobile-label"), this.navItem = this.navEl.find("li"), this.navLink = this.navEl.find("a"), this.init()
        }
        Plugin.prototype = {
            init: function() {
                var self = this;
                this.buildNavToggle();
                this.navToggling();
                this.scrollDetection();
                this.fixedPosition();
                this.anchorScrolling();
                this.positionDetection()
            },
            buildNavToggle: function() {
                var self = this;
                var firstNavLinkText = $(self.navItem[0]).find("a").text();
                this.toggle = $('<button class="toggle" type="button"><span class="label">' + self.navMobileLabel + '</span><span class="name">' + firstNavLinkText + "</span></button>");
                self.navEl.prepend(this.toggle);
                this.overlay = $('<div class="page-nav-overlay"></div>');
                self.body.append(this.overlay)
            },
            navToggledState: function() {
                var self = this;
                self.body.addClass("page-nav-engaged");
                self.el.addClass("nav-is-active");
                self.toggle.addClass("is-active")
            },
            navUnToggledState: function() {
                var self = this;
                self.body.removeClass("page-nav-engaged");
                self.el.removeClass("nav-is-active");
                self.toggle.removeClass("is-active")
            },
            navToggling: function() {
                var self = this;
                self.toggle.on("click", function() {
                    if (!self.toggle.hasClass("is-active")) {
                        self.navToggledState()
                    } else {
                        self.navUnToggledState()
                    }
                });
                $doc.on("click touchstart", function(ev) {
                    if ((self.el.has(ev.target).length === 0) && (self.body.hasClass("page-nav-engaged"))) {
                        self.navUnToggledState()
                    }
                })
            },
            scrollDetection: function() {
                var self = this,
                    prevScroll = 0;
                $(window).on("scroll", function() {
                    self.currentPos = parseInt($(this).scrollTop());
                    if (self.currentPos > prevScroll) {
                        self.upwardScroll = false
                    } else {
                        self.upwardScroll = true
                    }
                    prevScroll = self.currentPos;
                    self.navUnToggledState()
                })
            },
            fixedPosition: function() {
                var self = this;
                $(window).on("scroll", function() {
                    if (self.currentPos >= self.offsetFromTop + self.el.outerHeight()) {
                        self.el.addClass("is-sticky")
                    } else {
                        self.el.removeClass("is-sticky")
                    }
                    if (self.upwardScroll == true) {
                        self.el.addClass("is-visible")
                    } else {
                        self.el.removeClass("is-visible")
                    }
                    if (self.currentPos < self.offsetFromTop) {
                        self.el.removeClass("is-visible")
                    }
                })
            },
            anchorScrolling: function() {
                var self = this;
                self.navLink.on("click", function() {
                    var hash = $(this).attr("href");
                    if (self.el.hasClass("is-visible") || self.el.hasClass("is-sticky")) {
                        $(hash).scrollTo({
                            addedOffset: self.elOffset,
                            onComplete: function() {
                                setTimeout(function() {
                                    self.el.addClass("is-visible")
                                }, 100)
                            }
                        })
                    } else {
                        if (!self.el.hasClass("is-sticky")) {
                            var parentElIndex = $(this).parent().index();
                            if (winWidth <= 640) {
                                if (parentElIndex == 0) {
                                    $(hash).scrollTo({
                                        addedOffset: 1
                                    })
                                } else {
                                    $(hash).scrollTo({
                                        addedOffset: 50
                                    })
                                }
                            } else {
                                $(hash).scrollTo({
                                    addedOffset: -1
                                })
                            }
                        } else {
                            $(hash).scrollTo({
                                addedOffset: -1
                            })
                        }
                    }
                    self.navUnToggledState()
                })
            },
            positionDetection: function() {
                var self = this;
                $win.on("resize scroll", function() {
                    self.navLink.removeClass("active");
                    self.sectionEl.each(function() {
                        var topY;
                        if (self.el.hasClass("is-visible") || self.el.hasClass("is-sticky")) {
                            topY = parseInt($(this).offset().top - self.elOffset)
                        } else {
                            if (!self.el.hasClass("is-sticky")) {
                                topY = parseInt($(this).offset().top - 1)
                            } else {
                                topY = parseInt($(this).offset().top - 1)
                            }
                        }
                        var bottomY = topY + $(this).outerHeight();
                        if (self.currentPos >= topY && self.currentPos < bottomY) {
                            var link = $('a[href="#' + this.id + '"]');
                            link.addClass("active");
                            var linkText = link.text();
                            self.toggle.find(".name").text(linkText)
                        }
                    });
                    self.elOffset = self.el.outerHeight() - 1;
                    self.offsetFromTop = self.el.offset().top
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };
    $.fn.bgImgReplace = function(opts) {
        var pluginName = "bgImgReplace",
            defaults = {
                containerEl: ".container"
            },
            settings = $.extend({}, defaults, opts);

        function Plugin(el) {
            this.el = $(el), this.container = this.el.find(settings.containerEl), this.init()
        }
        Plugin.prototype = {
            init: function() {
                this.getImage()
            },
            getImage: function() {
                var self = this,
                    img = self.el.attr("data-bg-img"),
                    img2x = self.el.attr("data-bg-img-2x"),
                    imgSize = self.el.attr("data-bg-img-size").split(","),
                    imgWidth = imgSize[0],
                    imgHeight = imgSize[1],
                    imgPosition = self.el.attr("data-bg-img-position").split(","),
                    imgPosX = imgPosition[0],
                    imgPosY = imgPosition[1];
                self.setImage(img, img2x, imgWidth, imgHeight, imgPosX, imgPosY)
            },
            setImage: function(img, img2x, width, height, posX, posY) {
                var self = this,
                    imgToUse;
                if (window.devicePixelRatio > 1) {
                    imgToUse = img2x;
                    self.container.css({
                        "background-size": width + "px " + height + "px"
                    })
                } else {
                    imgToUse = img
                }
                self.container.css({
                    "background-image": "url(" + imgToUse + ")",
                    "background-position": posX + " " + posY,
                    "background-repeat": "no-repeat"
                })
            }
        };
        return this.each(function() {
            $.data(this, pluginName, new Plugin(this, settings))
        })
    };

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires
    }

    function getCookie(cname) {
        var name = cname + "=",
            ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ""
    }

    function browserAlert() {
        var html = $("html"),
            body = $("body"),
            notificationMarkup = $('<div class="legacy-browser-notification" id="legacy-browser-notification"><div class="container"><p>You\'re using Internet Explorer 7, which is an outdated browser. Please upgrade now.</p><a class="learn-more-button" href="/" title="Learn More">Learn more &rsaquo;</a><button class="dismiss-legacy-notification" type="button"></button></div></div>');
        if (html.hasClass("ie7") && getCookie("infor_legacy_browser_notification") !== "true") {
            body.prepend(notificationMarkup)
        }
        $(".dismiss-legacy-notification").on("click", function() {
            $("#legacy-browser-notification").slideUp(300);
            setCookie("infor_legacy_browser_notification", true, 7)
        })
    }

    function init() {
        browserAlert();
        $(".page-content-header").pageHeader();
        siteNav();
        $(".image-2x").image2x();
        $("#search-overlay").overlay({
            onComplete: function() {
                $("#search-input").focus();
                $("#search-input").on("keyup", function() {
                    if ($(this).val()) {
                        $(this).parent().addClass("active")
                    } else {
                        $(this).parent().removeClass("active")
                    }
                })
            }
        });
        $(".trigger-video-modal").videoModal();
        $(".has-sections").scrollToSection();
        var homepageHeroSlider = $("#homepage-hero-slider");
        if (homepageHeroSlider.length) {
            homepageHeroSlider.find(".slides").InforSlider({
                oneToOneTouch: false,
                slidePreview: true,
                auto: true,
                autoHover: true,
                autoStart: true,
                pause: 7000
            })
        }
        var heroSlider = $("#hero-slider");
        if (heroSlider.length) {
            heroSlider.find(".slides").InforSlider({
                oneToOneTouch: false,
                auto: true,
                autoHover: true,
                autoStart: true,
                pause: 7000
            })
        }
        var industriesSlider = $("#industries-slider");
        if (industriesSlider.length) {
            industriesSlider.slick({
                slidesToShow: 8,
                slidesToScroll: 1,
                swipeToSlide: true,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 6
                    }
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 5
                    }
                }, {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 401,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            })
        }
        var solutionsBlocks = $("#solutions-blocks");
        if (solutionsBlocks.length) {
            solutionsBlocks.togglableBlocks({
                collapseAll: true
            })
        }
        var companiesSlider = $("#companies-slider");
        if (companiesSlider.length) {
            companiesSlider.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                swipeToSlide: true,
                autoplaySpeed: 2000,
                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 2,
                        autoplay: false
                    }
                }, {
                    breakpoint: 401,
                    settings: {
                        slidesToShow: 1,
                        autoplay: false
                    }
                }]
            })
        }
        var factsSlider = $("#facts-slider");
        if (factsSlider.length) {
            factsSlider.slick({
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        }
        var socialSlider = $("#social-slider");
        if (socialSlider.length) {
            socialSlider.slick({
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true,
                infinite: false,
                responsive: [{
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            })
        }
        $(".news-entry .additional-content").togglableContent();
        var scrollToTop = $("#scroll-top");
        if (scrollToTop.length) {
            scrollToTop.on("click", function(ev) {
                ev.preventDefault();
                $("#container").scrollTo()
            })
        }
        var resourcesSlider = $("#resources-slider");
        if (resourcesSlider.length) {
            resourcesSlider.slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            })
        }
        $("#investor-tabs").tabs({
            stackedTabs: true
        });
        $(".upsell-card-blocks").equalHeights({
            className: ".block"
        });
        $(".upsell-card-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $(".details-blocks").equalHeights({
            className: ".block"
        });
        $(".details-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $(".external-link-blocks").equalHeights({
            className: ".block"
        });
        var verticalResourcesSlider = $(".vertical-resources-slider");
        if (verticalResourcesSlider.length) {
            verticalResourcesSlider.find(".slides").InforSlider({
                hideControlOnEnd: true,
                infiniteLoop: false,
                minSlides: 4,
                mode: "vertical",
                pager: false,
                slideMargin: 10
            })
        }
        var screensSlider = $("#screens-slider");
        if (screensSlider.length) {
            screensSlider.find(".slides").InforSlider({
                auto: true,
                autoHover: true,
                autoStart: true,
                controls: false,
                mode: "fade",
                pager: false,
                pause: 5000
            })
        }
        $(".profile-blocks").equalHeights({
            className: ".profile-block"
        });
        $(".exploration-container").equalHeights({
            className: ".col"
        });
        $("#product-industries-tabs").tabs({
            scrollableTabs: true
        });
        $(".exploration-blocks").equalHeights({
            className: ".block"
        });
        $(".exploration-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $(".product-resource-card-blocks").equalHeights({
            className: ".block"
        });
        $(".features-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $(".product-resource-card-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $(".blog-post-cards").equalHeights({
            className: ".blog-post-card"
        });
        $(".benefit-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $(".content-info-blocks .block").togglableContent({
            toggleClass: ".block-header"
        });
        $("#resources-tabs").tabs({
            stackedTabs: true,
            scrollableTabs: true
        });
        var storesSlider = $("#stories-slider");
        if (storesSlider.length) {
            storesSlider.slick({
                dots: true,
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        }
        $(".promo-banner").bgImgReplace();
        var partnersSlider = $("#partners-slider");
        if (partnersSlider.length) {
            partnersSlider.slick({
                dots: true,
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 641,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        }
        var customerSlider = $("#customer-slider");
        if (customerSlider.length) {
            customerSlider.slick({
                dots: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 641,
                    settings: {
                        arrows: false
                    }
                }]
            })
        }
        var togglableBlocksEl = $('[data-plugin="togglableBlocks"]');
        if (togglableBlocksEl.length) {
            togglableBlocksEl.togglableBlocks({
                collapseAll: true
            })
        }
        var highlightsBlocksEl = $('[data-plugin="highlightsBlocks"]');
        if (highlightsBlocksEl.length) {
            highlightsBlocksEl.togglableBlocks({
                collapseAll: true
            })
        }
    }
    return {
        init: init
    }
})(jQuery);
(function() {
    GLOBALS.$doc.ready(function() {
        INFOR.init()
    })
})(jQuery);


/// ROLAND HERE NOT UNDERSTANDING HOW TO PUT A FUNCTION IN A .VUE FILE
function showFeedbackForm(){
    document.getElementById("leavefeedbackform").style.display="inline";
    document.getElementById("leavefeedbackwelcome").style.display="none";
}
 function hideFeedbackForm() {
     document.getElementById("leavefeedbackform").style.display="none";
     document.getElementById("leavefeedbackthankyou").style.display="inline";
}
function showEmailForm(){
    document.getElementById("emailform").style.display="inline";
    document.getElementById("emailwelcome").style.display="none";
}
function hideEmailForm(){
    document.getElementById("emailthankyou").style.display="inline";
    document.getElementById("emailform").style.display="none";
}